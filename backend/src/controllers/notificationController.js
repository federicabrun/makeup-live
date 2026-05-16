const NotificationManager = require("../models/NotificationManager");

async function listNotifications(req, res, next) {
  try {
    res.json(await NotificationManager.listByUser(req.user.id));
  } catch (error) {
    next(error);
  }
}

async function markNotificationsRead(req, res, next) {
  try {
    await NotificationManager.markAllRead(req.user.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { listNotifications, markNotificationsRead };
