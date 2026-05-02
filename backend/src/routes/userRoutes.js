const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const validate = require("../middleware/validationMiddleware");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const { registerSchema, loginSchema, updateUserSchema } = require("../validators/userValidator");

// Public routes
router.post("/register", validate(registerSchema), UserController.register);
router.post("/login", validate(loginSchema), UserController.login);

// Protected routes (Admin only for fetching all/deleting)
router.get("/", authenticate, authorizeAdmin, UserController.getAll);
router.get("/:id", authenticate, UserController.getById);
router.put("/:id", authenticate, validate(updateUserSchema), UserController.update);
router.delete("/:id", authenticate, authorizeAdmin, UserController.delete);

module.exports = router;
