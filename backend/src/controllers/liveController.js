const db = require("../config/db");
const LiveSession = require("../models/LiveSession");

async function listLiveSessions(req, res, next) {
  try {
    const result = await db.query(
      `
      SELECT
        ls.id,
        ls.creator_id,
        ls.title,
        ls.description,
        ls.status,
        ls.scheduled_at,
        ls.started_at,
        ls.live_url,
        cr.name AS creator_name
      FROM live_sessions ls
      LEFT JOIN creators cr ON ls.creator_id = cr.id
      ORDER BY ls.scheduled_at ASC
      `
    );

    res.json(
      result.rows.map(row => ({
        id: row.id,
        creatorId: row.creator_id,
        creator_id: row.creator_id,
        title: row.title,
        description: row.description,
        status: row.status,
        scheduledAt: row.scheduled_at,
        scheduled_at: row.scheduled_at,
        startedAt: row.started_at,
        started_at: row.started_at,
        liveUrl: row.live_url,
        live_url: row.live_url,
        creatorName: row.creator_name,
        creator_name: row.creator_name
      }))
    );
  } catch (error) {
    next(error);
  }
}
module.exports = { listLiveSessions };
