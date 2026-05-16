const router = require("express").Router();
const { listLiveSessions } = require("../controllers/liveController");

/**
 * @swagger
 * /api/live-sessions:
 *   get:
 *     summary: List active and upcoming live sessions
 *     tags: [Live Sessions]
 *     responses:
 *       200:
 *         description: Live sessions list
 */
router.get("/", listLiveSessions);

module.exports = router;
