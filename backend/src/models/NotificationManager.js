const db = require("../config/db");

class NotificationManager {
  static async create(userId, title, body, type = "system") {
    const result = await db.query(
      `INSERT INTO notifications (user_id, title, body, type)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, title, body, type]
    );
    return result.rows[0];
  }

  static async listByUser(userId) {
    const result = await db.query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  static async markAllRead(userId) {
    await db.query(
      `UPDATE notifications SET read_at = NOW() WHERE user_id = $1 AND read_at IS NULL`,
      [userId]
    );
  }
}

module.exports = NotificationManager;
