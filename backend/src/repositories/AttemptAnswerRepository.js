const { db } = require("../config/db");

const findAll = async () => {
  const [rows] = await db.query("SELECT * FROM attempt_answers");
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM attempt_answers WHERE id = ?", [id]);
  return rows[0] || null;
};

const create = async (data) => {
  const { quiz_attempt_id, question_id, selected_option_id, is_correct, earned_points } = data;
  const [result] = await db.query(
    "INSERT INTO attempt_answers (quiz_attempt_id, question_id, selected_option_id, is_correct, earned_points) VALUES (?, ?, ?, ?, ?)",
    [quiz_attempt_id, question_id, selected_option_id, is_correct || 0, earned_points || 0.00]
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
    `UPDATE attempt_answers SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return findById(id);
};

const deleteAnswer = async (id) => {
  const [result] = await db.query("DELETE FROM attempt_answers WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteAnswer,
};


