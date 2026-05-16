const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { createMessage } = require("../controllers/messageController");

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a chat message to a live session
 *     tags: [Messages]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageRequest'
 *     responses:
 *       201:
 *         description: Message created
 */
router.post("/", auth, createMessage);

module.exports = router;
