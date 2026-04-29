const { db } = require("../config/db");

const findAll = async () => {
  const [rows] = await db.query("SELECT * FROM categories");
  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
  return rows[0] || null;
};

const create = async (data) => {
  const { name, description } = data;
  const [result] = await db.query(
    "INSERT INTO categories (name, description) VALUES (?, ?)",
    [name, description || null]
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
    `UPDATE categories SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return findById(id);
};

const deleteCategory = async (id) => {
  const [result] = await db.query("DELETE FROM categories WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteCategory,
};

