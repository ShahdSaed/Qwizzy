const express = require("express");
const router = express.Router();
const AttemptAnswerController = require("../controllers/AttemptAnswerController");
const validate = require("../middleware/validationMiddleware");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const { attemptAnswerSchema } = require("../validators/attemptAnswerValidator");

// Create
router.post("/", authenticate, validate(attemptAnswerSchema), AttemptAnswerController.create);

// Read All (Instructor only)
router.get("/", authenticate, authorizeAdmin, AttemptAnswerController.getAll);

// Read One (Instructor only)
router.get("/:id", authenticate, authorizeAdmin, AttemptAnswerController.getById);

// Update
router.put("/:id", authenticate, authorizeAdmin, validate(attemptAnswerSchema), AttemptAnswerController.update);

// Delete
router.delete("/:id", authenticate, authorizeAdmin, AttemptAnswerController.delete);

module.exports = router;
