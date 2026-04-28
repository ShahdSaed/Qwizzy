const { db } = require("../config/db");

class ResultRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM results");
    return rows;
  }

  async findById(id) {
    const [rows] = await db.query("SELECT * FROM results WHERE id = ?", [id]);
    return rows[0] || null;
  }

  async create(data) {
    const { quiz_attempt_id, final_score, max_score, percentage, status } = data;
    const [result] = await db.query(
      "INSERT INTO results (quiz_attempt_id, final_score, max_score, percentage, status) VALUES (?, ?, ?, ?, ?)",
      [quiz_attempt_id, final_score, max_score, percentage, status]
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
      `UPDATE results SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id);
  }

  async delete(id) {
    const [result] = await db.query("DELETE FROM results WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new ResultRepository();
