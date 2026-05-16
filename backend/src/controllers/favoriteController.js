const db = require("../config/db");

async function addFavorite(req, res, next) {
  try {
    const { entity_type, entity_id } = req.body;
    if (!["product", "tutorial"].includes(entity_type)) {
      return res.status(400).json({ message: "entity_type must be product or tutorial" });
    }

    const result = await db.query(
      `INSERT INTO favorites (user_id, entity_type, entity_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, entity_type, entity_id)
       DO UPDATE SET created_at = NOW()
       RETURNING *`,
      [req.user.id, entity_type, entity_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function listFavorites(req, res, next) {
  try {
    const result = await db.query(
      `
      SELECT
        f.id,
        f.user_id,
        f.entity_type,
        f.entity_id,
        f.created_at,

        CASE
          WHEN f.entity_type = 'product' THEN p.name
          WHEN f.entity_type = 'tutorial' THEN t.title
          ELSE CONCAT(f.entity_type, ' #', f.entity_id)
        END AS favorite_name,

        CASE
          WHEN f.entity_type = 'product' THEN p.brand
          WHEN f.entity_type = 'tutorial' THEN c.name
          ELSE NULL
        END AS subtitle,

        CASE
          WHEN f.entity_type = 'product' THEN p.purchase_url
          ELSE NULL
        END AS purchase_url

      FROM favorites f

      LEFT JOIN products p
        ON f.entity_type = 'product'
        AND f.entity_id = p.id

      LEFT JOIN tutorials t
        ON f.entity_type = 'tutorial'
        AND f.entity_id = t.id

      LEFT JOIN creators c
        ON t.creator_id = c.id

      WHERE f.user_id = $1
      ORDER BY f.created_at DESC
      `,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
}

async function removeFavorite(req, res, next) {
  try {
    await db.query("DELETE FROM favorites WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { addFavorite, listFavorites, removeFavorite };
