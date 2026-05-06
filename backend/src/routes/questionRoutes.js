const express = require("express");
const router = express.Router();
const QuestionController = require("../controllers/QuestionController");
const validate = require("../middleware/validationMiddleware");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const { questionSchema } = require("../validators/questionValidator");

// Create (Admin only)
router.post("/", authenticate, authorizeAdmin, validate(questionSchema), QuestionController.create);

// Read All 
router.get("/", QuestionController.getAll);

// Read One
router.get("/:id", QuestionController.getById);

router.get("/quiz/:quiz_id", QuestionController.getByQuizId);

// Update (Admin only)
router.put("/:id", authenticate, authorizeAdmin, validate(questionSchema), QuestionController.update);

// Delete (Admin only)
router.delete("/:id", authenticate, authorizeAdmin, QuestionController.delete);

module.exports = router;
