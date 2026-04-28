const express = require("express");
const router = express.Router();
const QuizController = require("../controllers/QuizController");

// Create
router.post("/", QuizController.create);

// Read All
router.get("/", QuizController.getAll);

// Read One
router.get("/:id", QuizController.getById);

// Update
router.put("/:id", QuizController.update);

// Delete
router.delete("/:id", QuizController.delete);

module.exports = router;
