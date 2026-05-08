const { v4: uuid } = require('uuid');

/**
 * Factory Pattern for Questions using Functions
 */

exports.createQuestion = (data) => {
    const { quiz_id, body, points, question_type = 'MCQ' } = data;
    
    // Add specific logic based on question type if needed
    return {
        id: uuid(),
        quiz_id,
        body,
        points: points || 1.0,
        question_type: question_type.toUpperCase(),
        created_at: new Date()
    };
};
