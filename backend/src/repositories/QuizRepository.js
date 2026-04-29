const { db } = require("../config/db");

const findAll = async () => {
  const [rows] = await db.query("SELECT * FROM quizzes");
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM quizzes WHERE id = ?", [id]);
  return rows[0] || null;
};

const create = async (data) => {
  const { title, description, created_by_user_id, is_published, time_limit_minutes, difficulty } = data;
  const [result] = await db.query(
    "INSERT INTO quizzes (title, description, created_by_user_id, is_published, time_limit_minutes, difficulty) VALUES (?, ?, ?, ?, ?, ?)",
    [title, description || null, created_by_user_id, is_published || 0, time_limit_minutes || null, difficulty || 'medium']
  );
  return findById(result.insertId);
};


const update = async (id, data) => {
  const updates = [];
  const values = [];
  
  for (const [key, value] of Object.entries(data)) {
    updates.push(`${key} = ?`);
    values.push(value);
  }
  
  if (updates.length === 0) return findById(id);

  values.push(id);
  await db.query(
    `UPDATE quizzes SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return findById(id);
};

const deleteQuiz = async (id) => {
  const [result] = await db.query("DELETE FROM quizzes WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteQuiz,
};

