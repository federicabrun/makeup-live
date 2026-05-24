const db = require("../config/db");
const Tutorial = require("../models/Tutorial");
const { getTutorialMedia } = require("../services/mediaService");

async function listTutorials(req, res, next) {
  try {
    const { category, difficulty, occasion } = req.query;

    const params = [];
    const filters = [];

    if (category) {
      params.push(category);
      filters.push(`c.name = $${params.length}`);
    }

    if (difficulty) {
      params.push(difficulty);
      filters.push(`t.difficulty = $${params.length}`);
    }

    if (occasion) {
      params.push(occasion);
      filters.push(`t.occasion = $${params.length}`);
    }

    const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    const result = await db.query(
      `
      SELECT 
        t.*, 
        c.name AS category_name, 
        cr.name AS creator_name
      FROM tutorials t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN creators cr ON t.creator_id = cr.id
      ${where}
      ORDER BY t.created_at DESC
      `,
      params
    );

    const tutorials = result.rows.map((row) => ({
      ...new Tutorial(row),
      categoryName: row.category_name,
      creatorName: row.creator_name,
      occasion: row.occasion
    }));

    res.json(tutorials);
  } catch (error) {
    next(error);
  }
}

async function getTutorialById(req, res, next) {
  try {
    const result = await db.query(
      `
      SELECT 
        t.*, 
        c.name AS category_name, 
        cr.name AS creator_name
      FROM tutorials t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN creators cr ON t.creator_id = cr.id
      WHERE t.id = $1
      `,
      [req.params.id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Tutorial not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function externalTutorialMedia(req, res, next) {
  try {
    res.json(await getTutorialMedia());
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listTutorials,
  getTutorialById,
  externalTutorialMedia
};