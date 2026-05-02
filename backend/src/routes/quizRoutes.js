const express = require("express");
const router = express.Router();
const QuizController = require("../controllers/QuizController");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");
const { createQuizSchema } = require("../validators/quizValidator");

// Create
router.post("/", authenticate, authorizeAdmin, validate(createQuizSchema), QuizController.create);

// Read All
router.get("/",authenticate, QuizController.getAll);

// Read One
router.get("/:id", authenticate, QuizController.getById);

// Update
router.put("/:id", authenticate, authorizeAdmin, validate(createQuizSchema), QuizController.update);

// Delete
router.delete("/:id", authenticate, authorizeAdmin, QuizController.delete);

module.exports = router;
