const db = require("../config/db");
const Product = require("../models/Product");
const { getExternalProducts } = require("../services/externalProductService");

async function listProducts(req, res, next) {
  try {
    const { category, brand, skin_type, max_price } = req.query;
    const params = [];
    const filters = [];

    if (category) {
      params.push(category);
      filters.push(`category ILIKE $${params.length}`);
    }

    if (brand) {
      params.push(`%${brand}%`);
      filters.push(`brand ILIKE $${params.length}`);
    }

    if (skin_type) {
      params.push(skin_type);
      filters.push(`(skin_type = $${params.length} OR skin_type = 'all')`);
    }

    if (max_price) {
      params.push(Number(max_price));
      filters.push(`price <= $${params.length}`);
    }

    const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
    const result = await db.query(`SELECT * FROM products ${where} ORDER BY created_at DESC`, params);

    res.json(result.rows.map((row) => new Product(row)));
  } catch (error) {
    next(error);
  }
}

async function listExternalProducts(req, res, next) {
  try {
    res.json(await getExternalProducts());
  } catch (error) {
    next(error);
  }
}

module.exports = { listProducts, listExternalProducts };
