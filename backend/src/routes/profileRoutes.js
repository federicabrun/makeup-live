const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/profileController");

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get authenticated user profile
 *     tags: [Profile]
 *     security: [{ bearerAuth: [] }]
 */
router.get("/", auth, getProfile);

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update authenticated user profile
 *     tags: [Profile]
 *     security: [{ bearerAuth: [] }]
 */
router.put("/", auth, updateProfile);

module.exports = router;
