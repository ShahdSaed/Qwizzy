const express = require("express");
const router = express.Router();
const QuizCategoryController = require("../controllers/QuizCategoryController");
const validate = require("../middleware/validationMiddleware");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const { quizCategorySchema } = require("../validators/quizCategoryValidator");

// Create (Admin only)
router.post("/", authenticate, authorizeAdmin, validate(quizCategorySchema), QuizCategoryController.create);

// Read All
router.get("/", authenticate, authorizeAdmin, QuizCategoryController.getAll);

// Delete (Admin only)
router.delete("/:quiz_id/:category_id", authenticate, authorizeAdmin, QuizCategoryController.delete);

module.exports = router;
