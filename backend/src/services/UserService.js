const UserRepository = require("../repositories/UserRepository");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");

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
    return await UserRepository.findAll().then(users => users.find(u => u.email === email));
  }

  async registerUser(data) {
    const existingUser = await this.getUserByEmail(data.email);
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await hashPassword(data.password);
    const userData = { ...data, password_hash: hashedPassword };
    return await UserRepository.create(userData);
  }

  async loginUser(email, password) {
    const user = await this.getUserByEmail(email);
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) throw new Error("Invalid email or password");

    return user;
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
