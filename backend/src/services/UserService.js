const { v4: uuidv4 } = require('uuid');
const UserRepository = require("../repositories/UserRepository");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const { sendEmail, getEmailTemplate } = require("../utils/emailUtils");

class UserService {
  async getAllUsers() {
    return await UserRepository.findAll();
  }

  async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async getUserByEmail(email) {
    return await UserRepository.findByEmail(email);
  }

  async registerUser(data) {
    const existingUser = await this.getUserByEmail(data.email);
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await hashPassword(data.password);
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
    
    const userData = { 
      id: uuidv4(),
      ...data, 
      password_hash: hashedPassword,
      verification_code: verificationCode
    };

    const user = await UserRepository.create(userData);

    // Send verification email
    const html = getEmailTemplate(
      "Verify Your Email",
      `Hi ${user.full_name}, welcome to Qwizzy! Please use the code below to verify your email address.`,
      verificationCode
    );
    await sendEmail(user.email, "Verify Your Email - Qwizzy", html);

    return user;
  }

  async verifyEmail(email, code) {
    const user = await UserRepository.findByVerificationCode(email, code);
    if (!user) throw new Error("Invalid or expired verification code");

    await UserRepository.update(user.id, { 
      is_verified: 1, 
      verification_code: null 
    });
    return { message: "Email verified successfully" };
  }

  async loginUser(email, password) {
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    if (!user.is_verified) throw new Error("Please verify your email before logging in");

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) throw new Error("Invalid email or password");

    const { generateToken } = require("../utils/jwtUtils");
    const token = generateToken({ id: user.id, role: user.role , full_name: user.full_name, email: user.email });

    return { token };
  }

  async forgotPassword(email) {
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error("User not found");

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
  }

  async verifyForgotPasswordCode(email, code) {
  const user = await UserRepository.findByResetCode(email, code);
  if (!user) {
    throw new Error("Invalid or expired reset code");
  }

  return { 
    message: "Code is valid", 
    email: user.email,
    reset_code: user.reset_password_code,
    reset_expires: user.reset_password_expires 
  };
}

  async resetPassword(email, newPassword) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const hashedPassword = await hashPassword(newPassword);
    await UserRepository.update(user.id, {
      password_hash: hashedPassword,
      reset_password_code: null,
      reset_password_expires: null
    });

    return { message: "Password reset successfully" };
  }

  async updateUser(id, data) {
    let updateData = { ...data };
    if (data.password) {
      updateData.password_hash = await hashPassword(data.password);
      delete updateData.password;
    }
    const updatedUser = await UserRepository.update(id, updateData);
    if (!updatedUser) throw new Error("User not found");
    return updatedUser;
  }

  async deleteUser(id) {
    const success = await UserRepository.delete(id);
    if (!success) throw new Error("User not found");
    return success;
  }
}

module.exports = new UserService();
