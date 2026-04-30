const express = require("express");
const router = express.Router();
const QuizAttemptController = require("../controllers/QuizAttemptController");
const validate = require("../middleware/validationMiddleware");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const { quizAttemptSchema } = require("../validators/quizAttemptValidator");

// Create (Authenticated users)
router.post("/", authenticate, validate(quizAttemptSchema), QuizAttemptController.create);

// Read All (Instructor only)
router.get("/", authenticate, authorizeAdmin, QuizAttemptController.getAll);

// Read One
router.get("/:id", authenticate, authorizeAdmin, QuizAttemptController.getById);

// Update
router.put("/:id", authenticate, authorizeAdmin, validate(quizAttemptSchema), QuizAttemptController.update);

// Delete
router.delete("/:id", authenticate, authorizeAdmin, QuizAttemptController.delete);

module.exports = router;
