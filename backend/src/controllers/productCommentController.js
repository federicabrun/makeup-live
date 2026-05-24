const db = require("../config/db");

async function listProductComments(req, res, next) {
  try {
    const { productId } = req.params;

    const result = await db.query(
      `
      SELECT 
        pc.id,
        pc.product_id,
        pc.user_id,
        pc.comment_text,
        pc.created_at,
        u.name AS user_name
      FROM product_comments pc
      JOIN users u ON pc.user_id = u.id
      WHERE pc.product_id = $1
      ORDER BY pc.created_at DESC
      `,
      [productId]
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function createProductComment(req, res, next) {
  try {
    const { productId } = req.params;
    const { comment_text } = req.body;

    if (!comment_text || !comment_text.trim()) {
      return res.status(400).json({
        message: "Comment text is required"
      });
    }

    const productExists = await db.query(
      "SELECT id FROM products WHERE id = $1",
      [productId]
    );

    if (!productExists.rows.length) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const result = await db.query(
      `
      INSERT INTO product_comments
      (product_id, user_id, comment_text)
      VALUES ($1, $2, $3)
      RETURNING id, product_id, user_id, comment_text, created_at
      `,
      [productId, req.user.id, comment_text.trim()]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listProductComments,
  createProductComment
};