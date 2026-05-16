const router = require("express").Router();
const { listProducts, listExternalProducts } = require("../controllers/productController");

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: List products with filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: brand
 *         schema: { type: string }
 *       - in: query
 *         name: skin_type
 *         schema: { type: string }
 *       - in: query
 *         name: max_price
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: Product list
 */
router.get("/", listProducts);

/**
 * @swagger
 * /api/products/external:
 *   get:
 *     summary: Get products from external Makeup API or fallback mock products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: External product list
 */
router.get("/external", listExternalProducts);

module.exports = router;
