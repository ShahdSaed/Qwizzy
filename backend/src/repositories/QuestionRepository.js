const { db } = require("../config/db");

class QuestionRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM questions");
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM questions WHERE id = ?", [id]);
    return rows[0] || null;
  }

  async create(data) {
    const { quiz_id, question_type, body, points, sort_order } = data;
    const [result] = await db.query(
      "INSERT INTO questions (quiz_id, question_type, body, points, sort_order) VALUES (?, ?, ?, ?, ?)",
      [quiz_id, question_type, body, points || 1.00, sort_order || 0]
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
      `UPDATE questions SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id);
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM questions WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new QuestionRepository();
