const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const validate = require("../middleware/validationMiddleware");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");
const { 
  registerSchema, 
  loginSchema, 
  updateUserSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyForgotPasswordCodeSchema
} = require("../validators/userValidator");

// Public routes (No authentication required)
router.post("/signup", validate(registerSchema), UserController.register);
router.post("/signin", validate(loginSchema), UserController.login);
router.post("/verify-email", validate(verifyEmailSchema), UserController.verifyEmail);
router.post("/forgot-password", validate(forgotPasswordSchema), UserController.forgotPassword);
router.post("/verify-forgot-password-code", validate(verifyForgotPasswordCodeSchema), UserController.verifyForgotPasswordCode);
router.post("/reset-password", validate(resetPasswordSchema), UserController.resetPassword);

// Protected routes (Authentication required)
router.get("/", authenticate, authorizeAdmin, UserController.getAll);
router.get("/:id", authenticate, UserController.getById);
router.put("/:id", authenticate, validate(updateUserSchema), UserController.update);
router.delete("/:id", authenticate, authorizeAdmin, UserController.delete);

module.exports = router;
