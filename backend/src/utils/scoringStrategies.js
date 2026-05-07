/**
 * Strategy Pattern for Scoring
 */

class ScoringStrategy {
    calculate(questions, userAnswers) {
        throw new Error("calculate method must be implemented");
    }
}

class StandardScoringStrategy extends ScoringStrategy {
    calculate(questions, userAnswers) {
        let totalScore = 0;
        let maxScore = 0;
        const results = [];
        const answersToSave = [];

        for (const question of questions) {
            const questionPoints = parseFloat(question.points || 0);
            maxScore += questionPoints;

            const userAnswer = userAnswers.find(a => a.question_id === question.id);
            const selectedOptionId = userAnswer ? userAnswer.selected_option_id : null;

            const correctOption = question.options.find(o => o.is_correct);
            const isCorrect = selectedOptionId === (correctOption ? correctOption.id : null);

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
                selected_option_label: question.options.find(o => o.id === selectedOptionId)?.label || null,
                is_correct: isCorrect,
                points: questionPoints,
                earned_points: earnedPoints
            });
        }

        return { totalScore, maxScore, results, answersToSave };
    }
}

module.exports = {
    StandardScoringStrategy
};
