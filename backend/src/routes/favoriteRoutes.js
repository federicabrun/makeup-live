const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { addFavorite, listFavorites, removeFavorite } = require("../controllers/favoriteController");

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add favorite product or tutorial
 *     tags: [Favorites]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteRequest'
 *     responses:
 *       201:
 *         description: Favorite created
 */
router.post("/", auth, addFavorite);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: List user favorites
 *     tags: [Favorites]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Favorites list
 */
router.get("/", auth, listFavorites);

/**
 * @swagger
 * /api/favorites/{id}:
 *   delete:
 *     summary: Remove favorite
 *     tags: [Favorites]
 *     security: [{ bearerAuth: [] }]
 */
router.delete("/:id", auth, removeFavorite);

module.exports = router;
