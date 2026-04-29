const { db } = require("../config/db");

class UserRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
  }

  async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
  }

  async findByVerificationCode(email, code) {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND verification_code = ?",
      [email, code]
    );
    return rows[0] || null;
  }

  
  async findByResetCode(email, code) {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ? AND reset_password_code = ? AND reset_password_expires > NOW()",
    [email, code]
  );
  return rows[0] || null;
  }

  async create(data) {
    const { id, email, password_hash, full_name, role, verification_code } = data;
    const [result] = await db.query(
      "INSERT INTO users (id, email, password_hash, full_name, role, verification_code) VALUES (?, ?, ?, ?, ?, ?)",
      [id, email, password_hash, full_name, role || 'user', verification_code]
    );
    return this.findById(id);
  }

  async update(id, data) {
    const updates = [];
    const values = [];
    
    for (const [key, value] of Object.entries(data)) {
      updates.push(`${key} = ?`);
      values.push(value);
    }
    
    if (updates.length === 0) return this.findById(id);

    values.push(id);
    await db.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id);
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new UserRepository();
