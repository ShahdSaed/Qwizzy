const { db } = require("../config/db");

exports.findAll = async () => {
  const [rows] = await db.query("SELECT * FROM questions");
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM questions WHERE id = ?", [id]);
  return rows[0] || null;
};


exports.findByQuizId = async (quiz_id) => {
  const [questions] = await db.query("SELECT * FROM questions WHERE quiz_id = ?", [quiz_id]);
  
  if (questions.length === 0) return [];

  const questionIds = questions.map(q => q.id);
  const [options] = await db.query(
    "SELECT * FROM question_options WHERE question_id IN (?) ORDER BY sort_order",
    [questionIds]
  );

  const optionsMap = options.reduce((acc, opt) => {
    if (!acc[opt.question_id]) acc[opt.question_id] = [];
    acc[opt.question_id].push(opt);
    return acc;
  }, {});

  return questions.map(q => ({
    ...q,
    options: optionsMap[q.id] || []
  }));
};

exports.create = async (data) => {
  const { id,quiz_id, question_type, body, points, sort_order } = data;
  await db.query(
    "INSERT INTO questions (id,quiz_id, question_type, body, points, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
    [id,quiz_id, question_type, body, points || 1.00, sort_order || 0]
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
    `UPDATE questions SET ${updates.join(', ')} WHERE id = ?`,
    values
  );
  
  return exports.findById(id);

};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM questions WHERE id = ?", [id]);
  return result.affectedRows > 0;
};