const { db } = require("../config/db");

class CategoryRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM categories");
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0] || null;
  }

  async create(data) {
    const { name, description } = data;
    const [result] = await db.query(
      "INSERT INTO categories (name, description) VALUES (?, ?)",
      [name, description || null]
    );
    return this.findById(result.insertId);
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
      `UPDATE categories SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id);
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM categories WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new CategoryRepository();
