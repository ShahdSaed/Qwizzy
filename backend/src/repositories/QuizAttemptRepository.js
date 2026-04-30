const { db } = require("../config/db");

const findAll = async () => {
  const [rows] = await db.query("SELECT * FROM quiz_attempts");
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM quiz_attempts WHERE id = ?", [id]);
  return rows[0] || null;
};

const create = async (data) => {
  const { id, user_id, quiz_id, submitted_at, score, max_score } = data;
  await db.query(
    "INSERT INTO quiz_attempts (id, user_id, quiz_id, submitted_at, score, max_score) VALUES (?, ?, ?, ?, ?, ?)",
    [id, user_id, quiz_id, submitted_at || null, score || null, max_score || null]
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
    `UPDATE quiz_attempts SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return findById(id);
};

const deleteAttempt = async (id) => {
  const [result] = await db.query("DELETE FROM quiz_attempts WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteAttempt,
};

