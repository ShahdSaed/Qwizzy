const { db } = require("../config/db");

const findAll = async () => {
  const [rows] = await db.query("SELECT * FROM results");
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM results WHERE id = ?", [id]);
  return rows[0] || null;
};

const create = async (data) => {
  const { quiz_attempt_id, final_score, max_score, percentage, status } = data;
  const [result] = await db.query(
    "INSERT INTO results (quiz_attempt_id, final_score, max_score, percentage, status) VALUES (?, ?, ?, ?, ?)",
    [quiz_attempt_id, final_score, max_score, percentage, status]
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
    `UPDATE results SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return findById(id);
};

const deleteResult = async (id) => {
  const [result] = await db.query("DELETE FROM results WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteResult,
};

