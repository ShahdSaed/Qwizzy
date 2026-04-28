const UserService = require("../services/UserService");
const UserDTO = require("../dto/UserDTO");
const { generateToken } = require("../utils/jwtUtils");

class UserController {
  async register(req, res) {
    try {
      const user = await UserService.registerUser(req.body);
      const userDTO = UserDTO.fromEntity(user);
      const token = generateToken({ id: user.id, role: user.role });
      res.status(201).json({ user: userDTO, token });
    } catch (error) {
      if (error.message === "Email already exists") {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.loginUser(email, password);
      const userDTO = UserDTO.fromEntity(user);
      const token = generateToken({ id: user.id, role: user.role });
      res.status(200).json({ user: userDTO, token });
    } catch (error) {
      if (error.message === "Invalid email or password") {
        return res.status(401).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(UserDTO.fromEntityList(users));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(UserDTO.fromEntity(user));
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json(UserDTO.fromEntity(user));
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
