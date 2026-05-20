const express = require("express");
const router = express.Router();

const {
  getExternalMakeupProducts
} = require("../controllers/externalController");

/**
 * @swagger
 * /api/external/makeup-products:
 *   get:
 *     summary: Get makeup products from an external public API
 *     tags:
 *       - External APIs
 *     parameters:
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter products by brand, for example maybelline
 *       - in: query
 *         name: product_type
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter products by product type, for example lipstick, mascara or foundation
 *     responses:
 *       200:
 *         description: List of external makeup products
 *       502:
 *         description: External API request failed
 */
router.get("/makeup-products", getExternalMakeupProducts);

module.exports = router;