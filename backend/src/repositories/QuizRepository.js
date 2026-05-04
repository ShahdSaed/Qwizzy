const { db } = require("../config/db");

exports.findAll = async (instructorId = null, onlyPublished = false) => {
  let query = "SELECT *,c.NAME as category_name FROM quizzes q LEFT JOIN categories c ON q.category_id = c.id";
  const values = [];
  const conditions = [];

  if (instructorId) {
    conditions.push("q.created_by_user_id = ?");
    values.push(instructorId);
  }

  if (onlyPublished) {
    conditions.push("q.is_published = 1");
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  const [rows] = await db.query(query, values);
  return rows;
};

exports.findAllWithQuestionCount = async (instructorId = null, onlyPublished = false) => {
  let query = `
    SELECT 
      q.*, 
      COUNT(qs.id) as questions_count,
      c.NAME as category_name
    FROM quizzes q 
    LEFT JOIN questions qs ON q.id = qs.quiz_id 
    LEFT JOIN categories c ON q.category_id = c.id 
  `;
  const values = [];
  const conditions = [];

  if (instructorId) {
    conditions.push("q.created_by_user_id = ?");
    values.push(instructorId);
  }

  if (onlyPublished) {
    conditions.push("q.is_published = 1");
  }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }

  query += " GROUP BY q.id ";

  const [rows] = await db.query(query, values);
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT q.*, qs.* FROM quizzes q LEFT JOIN questions qs ON q.id = qs.quiz_id WHERE q.id = ?", [id]);
  return rows;
};

exports.create = async (data) => {
  const { id, title, description, created_by_user_id, is_published, time_limit_minutes, difficulty, category_id } = data;
  await db.query(
    "INSERT INTO quizzes (id, title, description, created_by_user_id, is_published, time_limit_minutes, difficulty, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [id, title, description || null, created_by_user_id, is_published || 0, time_limit_minutes || null, difficulty || 'medium', category_id]
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
    `UPDATE quizzes SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return exports.findById(id);

};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM quizzes WHERE id = ?", [id]);
  return result.affectedRows > 0;
};