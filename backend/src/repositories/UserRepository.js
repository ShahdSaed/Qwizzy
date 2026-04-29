const { db } = require("../config/db");

const findAll = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0] || null;
};

const findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
};

const findByVerificationCode = async (email, code) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ? AND verification_code = ?",
    [email, code]
  );
  return rows[0] || null;
};

const findByResetCode = async (email, code) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ? AND reset_password_code = ? AND reset_password_expires > NOW()",
    [email, code]
  );
  return rows[0] || null;
};

const create = async (data) => {
  const { id, email, password_hash, full_name, role, verification_code } = data;
  await db.query(
    "INSERT INTO users (id, email, password_hash, full_name, role, verification_code) VALUES (?, ?, ?, ?, ?, ?)",
    [id, email, password_hash, full_name, role || 'user', verification_code]
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
    `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return findById(id);
};

const deleteUser = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  findByVerificationCode,
  findByResetCode,
  create,
  update,
  delete: deleteUser,
};

