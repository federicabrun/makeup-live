const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const db = require("../config/db");
const User = require("../models/User");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "2h"
    }
  );
}

async function register(req, res, next) {
  try {
    const { name, email, password, skin_type } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const existing = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.query(
      `
      INSERT INTO users 
      (name, email, password_hash, skin_type, auth_provider)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [name, email, passwordHash, skin_type || "normal", "local"]
    );

    const user = new User(result.rows[0]);

    return res.status(201).json({
      user: user.toPublicJSON()
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (!result.rows.length) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const user = new User(result.rows[0]);

    if (!user.passwordHash || user.passwordHash === "GOOGLE_AUTH_USER") {
      return res.status(401).json({
        message: "This account uses Google login"
      });
    }

    const passwordOk = await bcrypt.compare(password, user.passwordHash);

    if (!passwordOk) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = createToken(user);

    return res.json({
      token,
      user: user.toPublicJSON()
    });
  } catch (error) {
    next(error);
  }
}

async function googleLogin(req, res, next) {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required"
      });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({
        message: "Google Client ID is not configured"
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return res.status(401).json({
        message: "Invalid Google account"
      });
    }

    if (!payload.email_verified) {
      return res.status(401).json({
        message: "Google email is not verified"
      });
    }

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name || email.split("@")[0];

    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    let userRow;

    if (existingUser.rows.length) {
      const update = await db.query(
        `
        UPDATE users
        SET 
          google_id = COALESCE(google_id, $1),
          auth_provider = 'google'
        WHERE email = $2
        RETURNING *
        `,
        [googleId, email]
      );

      userRow = update.rows[0];
    } else {
      const insert = await db.query(
        `
        INSERT INTO users
        (name, email, password_hash, skin_type, google_id, auth_provider)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [
          name,
          email,
          "GOOGLE_AUTH_USER",
          "normal",
          googleId,
          "google"
        ]
      );

      userRow = insert.rows[0];
    }

    const user = new User(userRow);
    const token = createToken(user);

    return res.json({
      token,
      user: user.toPublicJSON()
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  googleLogin
};