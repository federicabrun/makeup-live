const db = require("../config/db");

async function createMessage(req, res, next) {
  try {
    const { live_session_id, content } = req.body;
    if (!live_session_id || !content) {
      return res.status(400).json({ message: "live_session_id and content are required" });
    }

    const result = await db.query(
      `INSERT INTO messages (live_session_id, user_id, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [live_session_id, req.user.id, content]
    );

    const io = req.app.get("io");
    io.to(`live:${live_session_id}`).emit("chat:message", {
      ...result.rows[0],
      user_name: req.user.name
    });

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = { createMessage };
