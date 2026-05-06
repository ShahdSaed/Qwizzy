const { db } = require("../config/db");

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM categories");
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
  return rows[0] || null;
};

exports.create = async (data) => {
  const { id, NAME, description } = data;
  await db.query(
    "INSERT INTO categories (id, NAME, description) VALUES (?, ?, ?)",
    [id, NAME, description || null]
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
    `UPDATE categories SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return exports.findById(id);

};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM categories WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
