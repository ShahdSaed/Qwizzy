const { db } = require("../config/db");

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM attempt_answers");
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM attempt_answers WHERE id = ?", [id]);
  return rows[0] || null;
};

exports.create = async (data) => {
  const { id, quiz_attempt_id, question_id, selected_option_id, is_correct, earned_points } = data;
  await db.query(
    "INSERT INTO attempt_answers (id, quiz_attempt_id, question_id, selected_option_id, is_correct, earned_points) VALUES (?, ?, ?, ?, ?, ?)",
    [id, quiz_attempt_id, question_id, selected_option_id, is_correct || 0, earned_points || 0.00]
  );
  return findById(id);
};

exports.update = async (id, data) => {
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

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM attempt_answers WHERE id = ?", [id]);
  return result.affectedRows > 0;
};


