const { db } = require("../config/db");

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM question_options");
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM question_options WHERE id = ?", [id]);
  return rows[0] || null;
};

exports.findByQuestionId = async (question_id) => {
  const [rows] = await db.query("SELECT * FROM question_options WHERE question_id = ?", [question_id]);
  return rows;
};

exports.findCorrectOptionByQuestionId = async (question_id) => {
  const [rows] = await db.query(
    "SELECT * FROM question_options WHERE question_id = ? AND is_correct = 1",
    [question_id]
  );
  return rows[0] || null;
};

exports.findByLabelAndQuestionId = async (label, question_id) => {
  const [rows] = await db.query(
    "SELECT * FROM question_options WHERE label = ? AND question_id = ?",
    [label, question_id]
  );
  return rows[0] || null;
};

exports.create = async (data) => {
  const { id, question_id, label, is_correct, sort_order } = data;
  await db.query(
    "INSERT INTO question_options (id, question_id, label, is_correct, sort_order) VALUES (?, ?, ?, ?, ?)",
    [id, question_id, label, is_correct ? 1 : 0, sort_order || 0]
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
    `UPDATE question_options SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return exports.findById(id);
};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM question_options WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

