/**
 * Scoring Strategies using Functions (Strategy Pattern)
 */

exports.calculateStandardScore = (questions, userAnswers) => {
    let totalScore = 0;
    let maxScore = 0;
    const results = [];
    const answersToSave = [];

    for (const question of questions) {
        const questionPoints = parseFloat(question.points || 0);
        maxScore += questionPoints;

        const userAnswer = userAnswers.find(a => String(a.question_id).trim() === String(question.id).trim());
        const selectedOptionId = userAnswer ? userAnswer.selected_option_id : null;

        const correctOption = question.options.find(o => Number(o.is_correct) === 1);
        const isCorrect = selectedOptionId && correctOption && String(selectedOptionId).trim() === String(correctOption.id).trim();

        const earnedPoints = isCorrect ? questionPoints : 0;
        totalScore += earnedPoints;

        if (selectedOptionId) {
            answersToSave.push({
                question_id: question.id,
                selected_option_id: selectedOptionId,
                is_correct: isCorrect,
                earned_points: earnedPoints
            });
        }

        results.push({
            question_id: question.id,
            body: question.body,
            selected_option_id: selectedOptionId,
            selected_option_label: question.options.find(o => String(o.id).trim() === String(selectedOptionId).trim())?.label || null,
            is_correct: isCorrect,
            points: questionPoints,
            earned_points: earnedPoints
        });
    }

    return { totalScore, maxScore, results, answersToSave };
};
