const router = require("express").Router();

const {
  listProductComments,
  createProductComment
} = require("../controllers/productCommentController");

const auth = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/products/{productId}/comments:
 *   get:
 *     summary: Get comments for a product
 *     tags: [Product Comments]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: List of product comments
 */
router.get("/:productId/comments", listProductComments);

/**
 * @swagger
 * /api/products/{productId}/comments:
 *   post:
 *     summary: Add a comment to a product
 *     tags: [Product Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment_text
 *             properties:
 *               comment_text:
 *                 type: string
 *                 example: I really like this product for daily makeup.
 *     responses:
 *       201:
 *         description: Comment created
 */
router.post("/:productId/comments", auth, createProductComment);

module.exports = router;