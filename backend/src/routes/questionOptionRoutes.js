const express = require("express");
const router = express.Router();
const QuestionOptionController = require("../controllers/QuestionOptionController");
const validate = require("../middleware/validationMiddleware");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const { questionOptionSchema } = require("../validators/questionOptionValidator");

// Create (Admin only)
router.post("/", authenticate, authorizeAdmin, validate(questionOptionSchema), QuestionOptionController.create);

// Read All
router.get("/", QuestionOptionController.getAll);

// Read One
router.get("/:id", QuestionOptionController.getById);

// Update (Admin only)
router.put("/:id", authenticate, authorizeAdmin, validate(questionOptionSchema), QuestionOptionController.update);

// Delete (Admin only)
router.delete("/:id", authenticate, authorizeAdmin, QuestionOptionController.delete);

module.exports = router;
