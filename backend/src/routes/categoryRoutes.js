const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const validate = require("../middleware/validationMiddleware");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const { categorySchema } = require("../validators/categoryValidator");

// Create (Admin only)
router.post("/", authenticate, authorizeAdmin, validate(categorySchema), CategoryController.create);

// Read All (Admin only)
router.get("/", authenticate, authorizeAdmin, CategoryController.getAll);

// Read One
router.get("/:id", authenticate, authorizeAdmin, CategoryController.getById);

// Update (Admin only)
router.put("/:id", authenticate, authorizeAdmin, validate(categorySchema), CategoryController.update);

// Delete (Admin only)
router.delete("/:id", authenticate, authorizeAdmin, CategoryController.delete);

module.exports = router;
