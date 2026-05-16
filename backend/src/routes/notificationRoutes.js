const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { listNotifications, markNotificationsRead } = require("../controllers/notificationController");

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: List user notifications
 *     tags: [Notifications]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Notification list
 */
router.get("/", auth, listNotifications);

/**
 * @swagger
 * /api/notifications/read:
 *   patch:
 *     summary: Mark all notifications as read
 *     tags: [Notifications]
 *     security: [{ bearerAuth: [] }]
 */
router.patch("/read", auth, markNotificationsRead);

module.exports = router;
