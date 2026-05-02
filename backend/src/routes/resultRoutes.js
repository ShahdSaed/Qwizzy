const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/ResultController");
const validate = require("../middleware/validationMiddleware");
const { authenticate } = require("../middleware/authMiddleware");
const { resultSchema } = require("../validators/resultValidator");

// Create
router.post("/", authenticate, validate(resultSchema), ResultController.create);

// Read All
router.get("/", authenticate, ResultController.getAll);

// Read One
router.get("/:id", authenticate, ResultController.getById);

// Update
router.put("/:id", authenticate, validate(resultSchema), ResultController.update);

// Delete
router.delete("/:id", authenticate, ResultController.delete);

module.exports = router;
