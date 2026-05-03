const { db } = require("../config/db");

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM results");
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM results WHERE id = ?", [id]);
  return rows[0] || null;
};

exports.create = async (data) => {
  const { id, quiz_attempt_id, final_score, max_score, percentage, STATUS, achieved_at } = data;
  await db.query(
    "INSERT INTO results (id, quiz_attempt_id, final_score, max_score, percentage, STATUS, achieved_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, quiz_attempt_id, final_score, max_score, percentage, STATUS, achieved_at || new Date()]
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
    `UPDATE results SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return exports.findById(id);

};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM results WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

