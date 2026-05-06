# Final Presentation Outline - Qwizzy

## 1. Problem Statement
- Manual quiz management is tedious and prone to errors.
- Lack of immediate feedback for students.
- Difficulty in tracking progress and scoring for instructors.

## 2. Our Solution: Qwizzy
- A centralized platform for quiz creation and management.
- Automated scoring and results breakdown.
- Layered architecture for reliability and scalability.

## 3. Architecture & Design
- **Architecture**: Layered (Controller-Service-Repository).
- **Design Patterns**:
    - **Repository**: Data access abstraction.
    - **Factory**: Question object creation.
    - **Strategy**: Pluggable scoring logic.
    - **Singleton**: DB connection management.

## 4. SOLID Principles in Practice
- **Single Responsibility**: Separate logic for Auth, Quizzes, and Results.
- **Open/Closed**: Scoring strategies can be added without modifying the service.

## 5. Technology Stack
- **Backend**: Node.js, Express.
- **Database**: MySQL.
- **Validation**: Joi.
- **Testing**: Jest.