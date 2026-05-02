const { db } = require("../config/db");

class QuizCategoryRepository {
  async findAll() {
    const [rows] = await db.query("SELECT * FROM quiz_categories");
    return rows;
  }

  async findByIds(quiz_id, category_id) {
    const [rows] = await db.query("SELECT * FROM quiz_categories WHERE quiz_id = ? AND category_id = ?", [quiz_id, category_id]);
    return rows[0] || null;
  }

  async create(data) {
    const { quiz_id, category_id } = data;
    await db.query(
      "INSERT INTO quiz_categories (quiz_id, category_id) VALUES (?, ?)",
      [quiz_id, category_id]
    );
    return this.findByIds(quiz_id, category_id);
  }

  // Usually there's no update for a composite primary key bridging table, just delete and create
  async delete(quiz_id, category_id) {
    const [result] = await db.query("DELETE FROM quiz_categories WHERE quiz_id = ? AND category_id = ?", [quiz_id, category_id]);
    return result.affectedRows > 0;
  }
}

module.exports = new QuizCategoryRepository();
