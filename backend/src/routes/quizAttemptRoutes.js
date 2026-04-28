const express = require("express");
const router = express.Router();
const QuizAttemptController = require("../controllers/QuizAttemptController");
const validate = require("../middleware/validationMiddleware");
const { authenticate } = require("../middleware/authMiddleware");
const { quizAttemptSchema } = require("../validators/quizAttemptValidator");

// Create (Authenticated users)
router.post("/", authenticate, validate(quizAttemptSchema), QuizAttemptController.create);

// Read All (Authenticated users)
router.get("/", authenticate, QuizAttemptController.getAll);

// Read One
router.get("/:id", authenticate, QuizAttemptController.getById);

// Update
router.put("/:id", authenticate, validate(quizAttemptSchema), QuizAttemptController.update);

// Delete
router.delete("/:id", authenticate, QuizAttemptController.delete);

module.exports = router;
