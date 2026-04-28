const { db } = require("../config/db");

class QuizRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM quizzes");
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM quizzes WHERE id = ?", [id]);
    return rows[0] || null;
  }

  async create(data) {
    const { title, description, created_by_user_id, is_published, time_limit_minutes } = data;
    const [result] = await db.query(
      "INSERT INTO quizzes (title, description, created_by_user_id, is_published, time_limit_minutes) VALUES (?, ?, ?, ?, ?)",
      [title, description || null, created_by_user_id, is_published || 0, time_limit_minutes || null]
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
      `UPDATE quizzes SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id);
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM quizzes WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new QuizRepository();
