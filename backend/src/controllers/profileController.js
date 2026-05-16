const db = require("../config/db");
const User = require("../models/User");

async function getProfile(req, res, next) {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [req.user.id]);
    if (!result.rows.length) return res.status(404).json({ message: "User not found" });
    res.json(new User(result.rows[0]).toPublicJSON());
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const { name, skin_type, preferences } = req.body;
    const result = await db.query(
      `UPDATE users
       SET name = COALESCE($1, name),
           skin_type = COALESCE($2, skin_type),
           preferences = COALESCE($3, preferences),
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [name, skin_type, preferences ? JSON.stringify(preferences) : null, req.user.id]
    );
    res.json(new User(result.rows[0]).toPublicJSON());
  } catch (error) {
    next(error);
  }
}

module.exports = { getProfile, updateProfile };
