const { db } = require("../config/db");

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM quiz_attempts");
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM quiz_attempts WHERE id = ?", [id]);
  return rows[0] || null;
};

exports.create = async (data) => {
  const { id, user_id, quiz_id, started_at, submitted_at, score, max_score } = data;
  await db.query(
    "INSERT INTO quiz_attempts (id, user_id, quiz_id, started_at, submitted_at, score, max_score) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, user_id, quiz_id, started_at || new Date(), submitted_at || null, score || null, max_score || null]
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
    `UPDATE quiz_attempts SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return exports.findById(id);

};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM quiz_attempts WHERE id = ?", [id]);
  return result.affectedRows > 0;
};