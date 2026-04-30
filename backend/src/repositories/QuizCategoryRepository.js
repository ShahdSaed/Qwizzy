const { db } = require("../config/db");

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM quiz_categories");
  return rows;
};

exports.findByIds = async (quiz_id, category_id) => {
  const [rows] = await db.query("SELECT * FROM quiz_categories WHERE quiz_id = ? AND category_id = ?", [quiz_id, category_id]);
  return rows[0] || null;
};

exports.create = async (data) => {
  const { quiz_id, category_id } = data;
  await db.query(
    "INSERT INTO quiz_categories (quiz_id, category_id) VALUES (?, ?)",
    [quiz_id, category_id]
  );
  return findByIds(quiz_id, category_id);
};

exports.delete = async (quiz_id, category_id) => {
  const [result] = await db.query("DELETE FROM quiz_categories WHERE quiz_id = ? AND category_id = ?", [quiz_id, category_id]);
  return result.affectedRows > 0;
};