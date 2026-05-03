const express = require("express");
const cors = require("cors");
const categoryRoutes = require("./src/routes/categoryRoutes");
const userRoutes = require("./src/routes/userRoutes");
const quizRoutes = require("./src/routes/quizRoutes");
const questionRoutes = require("./src/routes/questionRoutes");
const questionOptionRoutes = require("./src/routes/questionOptionRoutes");
const quizAttemptRoutes = require("./src/routes/quizAttemptRoutes");
const attemptAnswerRoutes = require("./src/routes/attemptAnswerRoutes");
const resultRoutes = require("./src/routes/resultRoutes");
const quizCategoryRoutes = require("./src/routes/quizCategoryRoutes");

const errorHandler = require("./src/middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/question-options", questionOptionRoutes);
app.use("/api/quiz-attempts", quizAttemptRoutes);
app.use("/api/attempt-answers", attemptAnswerRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/quiz-categories", quizCategoryRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Qwizzy API is running"
  });
});

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
