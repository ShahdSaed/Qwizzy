const { db } = require("../config/db");

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM quizzes");
  return rows;
};

exports.findAllWithQuestionCount = async () => {
  const [rows] = await db.query(`
    SELECT 
      q.*, 
      COUNT(qs.id) as questions_count,
      c.NAME as category_name
    FROM quizzes q 
    LEFT JOIN questions qs ON q.id = qs.quiz_id 
    LEFT JOIN categories c ON q.category_id = c.id 
    GROUP BY q.id
  `);
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