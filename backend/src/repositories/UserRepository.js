const { db } = require("../config/db");

exports.findAll = async () => {
  const query = `
    SELECT 
        u.*,
        CASE 
            WHEN u.role = 'instructor' THEN (SELECT COUNT(*) FROM quizzes q WHERE q.created_by_user_id = u.id)
            ELSE (SELECT COUNT(*) FROM quiz_attempts qa WHERE qa.user_id = u.id)
        END as quizzes_count
    FROM users u
  `;
  const [rows] = await db.query(query);
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0] || null;
};

exports.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
};

exports.findByVerificationCode = async (email, code) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ? AND verification_code = ?",
    [email, code]
  );
  return rows[0] || null;
};

exports.findByResetCode = async (email, code) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ? AND reset_password_code = ? AND reset_password_expires > NOW()",
    [email, code]
  );
  return rows[0] || null;
};

exports.create = async (data) => {
  const { id, email, password_hash, full_name, role, verification_code } = data;
  await db.query(
    "INSERT INTO users (id, email, password_hash, full_name, role, verification_code) VALUES (?, ?, ?, ?, ?, ?)",
    [id, email, password_hash, full_name, role || 'user', verification_code]
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
  
  if (updates.length === 0) return findById(id);

  values.push(id);
  await db.query(
    `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return exports.findById(id);

};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

exports.getStats = async (userId) => {
  const query = `
    SELECT 
        COUNT(qa.id) as quizzes_completed,
        ROUND(COALESCE(AVG(r.percentage), 0), 0) as average_score,
        COALESCE(SUM(r.final_score), 0) as total_points
    FROM quiz_attempts qa
    LEFT JOIN results r ON qa.id = r.quiz_attempt_id
    WHERE qa.user_id = ?
  `;
  const [rows] = await db.query(query, [userId]);
  return rows[0];
};


