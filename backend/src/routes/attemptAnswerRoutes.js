const express = require("express");
const router = express.Router();
const AttemptAnswerController = require("../controllers/AttemptAnswerController");
const validate = require("../middleware/validationMiddleware");
const { authenticate } = require("../middleware/authMiddleware");
const { attemptAnswerSchema } = require("../validators/attemptAnswerValidator");

// Create
router.post("/", authenticate, validate(attemptAnswerSchema), AttemptAnswerController.create);

// Read All
router.get("/", authenticate, AttemptAnswerController.getAll);

// Read One
router.get("/:id", authenticate, AttemptAnswerController.getById);

// Update
router.put("/:id", authenticate, validate(attemptAnswerSchema), AttemptAnswerController.update);

// Delete
router.delete("/:id", authenticate, AttemptAnswerController.delete);

module.exports = router;
