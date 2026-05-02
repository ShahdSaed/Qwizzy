const { db } = require("../config/db");

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM quizzes");
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM quizzes WHERE id = ?", [id]);
  return rows[0] || null;
};

exports.create = async (data) => {
  const { id, title, description, created_by_user_id, is_published, time_limit_minutes, difficulty } = data;
  await db.query(
    "INSERT INTO quizzes (id, title, description, created_by_user_id, is_published, time_limit_minutes, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, title, description || null, created_by_user_id, is_published || 0, time_limit_minutes || null, difficulty || 'medium']
  );
  return exports.findById(id);

};

exports.update = async (id, data) => {
  const updates = [];
  const values = [];
  
  for (const [key, value] of Object.entries(data)) {
    updates.push(`${key} = ?`);
    values.push(value);
  }
  
  if (updates.length === 0) return exports.findById(id);


  values.push(id);
  await db.query(
    `UPDATE quizzes SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return exports.findById(id);

};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM quizzes WHERE id = ?", [id]);
  return result.affectedRows > 0;
};