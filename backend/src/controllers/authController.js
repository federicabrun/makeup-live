const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const User = require("../models/User");

async function register(req, res, next) {
  try {
    const { name, email, password, skin_type } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await db.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows.length) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (name, email, password_hash, skin_type)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, passwordHash, skin_type || "normal"]
    );

    const user = new User(result.rows[0]);
    return res.status(201).json({ user: user.toPublicJSON() });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!result.rows.length) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = new User(result.rows[0]);
    const passwordOk = await bcrypt.compare(password, user.passwordHash);

    if (!passwordOk) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
    );

    return res.json({ token, user: user.toPublicJSON() });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };
