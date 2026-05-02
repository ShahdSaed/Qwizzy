const { db } = require("../config/db");

class QuestionOptionRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM question_options");
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM question_options WHERE id = ?", [id]);
    return rows[0] || null;
  }

  async create(data) {
    const { question_id, label, is_correct, sort_order } = data;
    const [result] = await db.query(
      "INSERT INTO question_options (question_id, label, is_correct, sort_order) VALUES (?, ?, ?, ?)",
      [question_id, label, is_correct || 0, sort_order || 0]
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
      `UPDATE question_options SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id);
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM question_options WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new QuestionOptionRepository();
