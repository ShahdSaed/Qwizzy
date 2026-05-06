# Software Requirements Specification (SRS) - Qwizzy

## 1. Introduction
Qwizzy is an online examination and quiz platform designed to help instructors create assessments and students to practice and test their knowledge.

## 2. Functional Requirements

### 2.1 User Management
- **FR1**: System shall allow users to sign up with email and password.
- **FR2**: System shall verify user emails via a verification code.
- **FR3**: System shall provide password reset functionality.
- **FR4**: System shall support two roles: `User` (Student) and `Instructor`.

### 2.2 Quiz Management (Instructors)
- **FR5**: Instructors shall be able to create, read, update, and delete quizzes.
- **FR6**: Instructors shall be able to add questions (MCQ or True/False) to quizzes.
- **FR7**: Instructors shall be able to define options for each question and mark the correct one.
- **FR8**: System shall ensure each question has only one correct option (for single-choice).

### 2.3 Exam Attempting (Users)
- **FR9**: Users shall be able to browse published quizzes.
- **FR10**: Users shall be able to start an attempt for a quiz.
- **FR11**: Users shall be able to submit their answers in bulk.
- **FR12**: System shall calculate the score automatically upon submission.
- **FR13**: System shall provide a detailed result report (Correct/Incorrect) without revealing correct answers for future attempts (as per recent configuration).

### 2.4 Results & Analytics
- **FR14**: System shall store attempt history for each user.
- **FR15**: System shall provide performance statistics (percentage, earned points).

## 3. Non-Functional Requirements
- **NFR1 (Security)**: All passwords must be hashed using bcrypt.
- **NFR2 (Performance)**: Quiz submission results should be calculated and returned within 2 seconds.
- **NFR3 (Scalability)**: The system should handle concurrent attempts using optimized SQL queries.
- **NFR4 (Reliability)**: Database integrity must be maintained via Foreign Key constraints and transactions.

## 4. Use Cases

### UC1: Create Quiz
- **Actor**: Instructor
- **Flow**: 
    1. Instructor logs in.
    2. Instructor provides quiz title, category, and settings.
    3. System validates and saves the quiz.

### UC2: Take Exam
- **Actor**: User
- **Flow**:
    1. User selects a quiz.
    2. User submits answers for all questions.
    3. System validates answers against the database.
    4. System returns the final score and breakdown.
