const UserService = require("../services/UserService");
const UserDTO = require("../dto/UserDTO");

const register = async (req, res) => {
  try {
    const user = await UserService.registerUser(req.body);
    const userDTO = UserDTO.fromEntity(user);
    res.status(201).json({ 
      message: "Registration successful! Please check your email for the verification code.",
      user: userDTO 
    });
  } catch (error) {
    if (error.message === "Email already exists") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;
    const result = await UserService.verifyEmail(email, code);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Invalid email or password" || error.message === "Please verify your email before logging in") {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};


const verifyForgotPasswordCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const result = await UserService.verifyForgotPasswordCode(email, code);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await UserService.forgotPassword(email);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const result = await UserService.resetPassword(email, newPassword);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(UserDTO.fromEntityList(users));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(UserDTO.fromEntity(user));
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.user.id, req.body);
    res.status(200).json(UserDTO.fromEntity(user));
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserService.deleteUser(req.user.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const stats = await UserService.getUserStats(req.user.id);
    res.status(200).json(stats);
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  verifyForgotPasswordCode,
  forgotPassword,
  resetPassword,
  getAll,
  getById,
  update,
  delete: deleteUser,
  getStats
};


