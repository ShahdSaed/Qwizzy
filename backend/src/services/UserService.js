const { v4: uuidv4 } = require('uuid');
const UserRepository = require("../repositories/UserRepository");
const UserDTO = require("../dto/UserDTO");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const { sendEmail, getEmailTemplate } = require("../utils/emailUtils");
const { generateToken } = require("../utils/jwtUtils");
const AppError = require("../utils/AppError");

exports.getAll = async () => {
  return await UserRepository.findAll();
};

exports.findById = async (id) => {
  const user = await UserRepository.findById(id);
  if (!user) throw new AppError("User not found", 404);
  return user;
};

exports.findByEmail = async (email) => {
  return await UserRepository.findByEmail(email);
};

exports.register = async (data) => {
  const existingUser = await exports.findByEmail(data.email);
  if (existingUser) throw new AppError("Email already exists", 400);

  const hashedPassword = await hashPassword(data.password);
  const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
  
  const userData = { 
    id: uuidv4(),
    ...data, 
    password_hash: hashedPassword,
    verification_code: verificationCode
  };

  const user = await UserRepository.create(userData);

  const html = getEmailTemplate(
    "Verify Your Email",
    `Hi ${user.full_name}, welcome to Qwizzy! Please use the code below to verify your email address.`,
    verificationCode
  );
  await sendEmail(user.email, "Verify Your Email - Qwizzy", html);

  return user;
};

exports.verifyEmail = async (email, code) => {
  const user = await UserRepository.findByVerificationCode(email, code);
  if (!user) throw new AppError("Invalid or expired verification code", 400);

  await UserRepository.update(user.id, { 
    is_verified: 1, 
    verification_code: null 
  });
  return { message: "Email verified successfully" };
};

exports.login = async (email, password) => {
  const user = await exports.findByEmail(email);
  if (!user) throw new AppError("Invalid email or password", 401);

  if (!user.is_verified) throw new AppError("Please verify your email before logging in", 401);

  const isMatch = await comparePassword(password, user.password_hash);
  if (!isMatch) throw new AppError("Invalid email or password", 401);

  const token = generateToken({ id: user.id, role: user.role , full_name: user.full_name, email: user.email });

  return { token };
};

exports.forgotPassword = async (email) => {
  const user = await exports.findByEmail(email);
  if (!user) throw new AppError("User not found", 404);

  const resetCode = Math.floor(1000 + Math.random() * 9000).toString();
  const expires = new Date(Date.now() + 3600000); // 1 hour

  await UserRepository.update(user.id, {
    reset_password_code: resetCode,
    reset_password_expires: expires
  });

  const html = getEmailTemplate(
    "Reset Your Password",
    `Hi ${user.full_name}, you requested a password reset. Use the code below to proceed.`,
    resetCode
  );
  await sendEmail(user.email, "Password Reset - Qwizzy", html);

  return { message: "Reset code sent to your email" };
};

exports.verifyForgotPasswordCode = async (email, code) => {
  const user = await UserRepository.findByResetCode(email, code);
  if (!user) throw new AppError("Invalid or expired reset code", 400);

  return { 
    message: "Code is valid", 
    email: user.email,
    reset_code: user.reset_password_code,
    reset_expires: user.reset_password_expires 
  };
};

exports.resetPassword = async (email, newPassword) => {
  const user = await exports.findByEmail(email);
  if (!user) throw new AppError("User not found", 404);

  // Security check: only allow reset if a code exists and hasn't expired
  if (!user.reset_password_code || !user.reset_password_expires || new Date(user.reset_password_expires) < new Date()) {
    throw new AppError("No active or valid password reset request found. Please request a new code.", 400);
  }

  const hashedPassword = await hashPassword(newPassword);
  await UserRepository.update(user.id, {
    password_hash: hashedPassword,
    reset_password_code: null,
    reset_password_expires: null
  });

  return { message: "Password reset successfully" };
};

exports.update = async (id, data) => {
  let updateData = { ...data };
  if (data.password) {
    updateData.password_hash = await hashPassword(data.password);
    delete updateData.password;
  }
  const updatedUser = await UserRepository.update(id, updateData);
  if (!updatedUser) throw new AppError("User not found", 404);
  return updatedUser;
};

exports.delete = async (id) => {
  const success = await UserRepository.delete(id);
  if (!success) throw new AppError("User not found", 404);
  return success;
};

exports.getStats = async (userId) => {
  const user = await UserRepository.findById(userId);
  if (!user) throw new AppError("User not found", 404);
  return await UserRepository.getStats(userId);
};
