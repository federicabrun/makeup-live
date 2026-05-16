const router = require("express").Router();
const { listTutorials, getTutorialById, externalTutorialMedia } = require("../controllers/tutorialController");

/**
 * @swagger
 * /api/tutorials:
 *   get:
 *     summary: List tutorials
 *     tags: [Tutorials]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: difficulty
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Tutorial list
 */
router.get("/", listTutorials);

/**
 * @swagger
 * /api/tutorials/external/media:
 *   get:
 *     summary: Get external-ready media content or fallback mock content
 *     tags: [Tutorials]
 *     responses:
 *       200:
 *         description: External media list
 */
router.get("/external/media", externalTutorialMedia);

/**
 * @swagger
 * /api/tutorials/{id}:
 *   get:
 *     summary: Get tutorial detail
 *     tags: [Tutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Tutorial detail
 */
router.get("/:id", getTutorialById);

module.exports = router;
