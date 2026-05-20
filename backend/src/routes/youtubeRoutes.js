const express = require("express");
const router = express.Router();

const {
  searchYouTubeTutorials
} = require("../controllers/youtubeController");

/**
 * @swagger
 * /api/youtube/search:
 *   get:
 *     summary: Search makeup videos using YouTube Data API
 *     tags:
 *       - External APIs
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: Search query, for example soft glam makeup tutorial
 *       - in: query
 *         name: eventType
 *         schema:
 *           type: string
 *           enum: [live, completed, upcoming]
 *         required: false
 *         description: Optional broadcast event filter
 *       - in: query
 *         name: maxResults
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of videos to return
 *     responses:
 *       200:
 *         description: List of YouTube videos
 */
router.get("/search", searchYouTubeTutorials);

module.exports = router;