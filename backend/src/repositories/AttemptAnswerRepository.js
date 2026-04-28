const { db } = require("../config/db");

class AttemptAnswerRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM attempt_answers");
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM attempt_answers WHERE id = ?", [id]);
    return rows[0] || null;
  }

  async create(data) {
    const { quiz_attempt_id, question_id, selected_option_id, is_correct, earned_points } = data;
    const [result] = await db.query(
      "INSERT INTO attempt_answers (quiz_attempt_id, question_id, selected_option_id, is_correct, earned_points) VALUES (?, ?, ?, ?, ?)",
      [quiz_attempt_id, question_id, selected_option_id, is_correct || 0, earned_points || 0.00]
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
      `UPDATE attempt_answers SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id);
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM attempt_answers WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new AttemptAnswerRepository();
