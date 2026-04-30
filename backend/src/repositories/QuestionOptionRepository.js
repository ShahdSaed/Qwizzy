const { db } = require("../config/db");

const findAll = async () => {
  const [rows] = await db.query("SELECT * FROM question_options");
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM question_options WHERE id = ?", [id]);
  return rows[0] || null;
};

const create = async (data) => {
  const { id, question_id, label, is_correct, sort_order } = data;
  await db.query(
    "INSERT INTO question_options (id, question_id, label, is_correct, sort_order) VALUES (?, ?, ?, ?, ?)",
    [id, question_id, label, is_correct || 0, sort_order || 0]
  );
  return findById(id);
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
    `UPDATE question_options SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return findById(id);
};

const deleteOption = async (id) => {
  const [result] = await db.query("DELETE FROM question_options WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteOption,
};

