# Qwizzy - Online Quiz & Exam System

Qwizzy is a robust, layered-architecture backend for an online quiz and examination system. Built with Node.js, Express, and MySQL, it follows professional software engineering standards, including Clean Code, SOLID principles, and design patterns.

## 🚀 Key Features

- **Authentication System**: Secure sign-up, sign-in, email verification, and password reset.
- **Role-Based Access Control**: Different permissions for Users and Instructors.
- **Quiz Management**: Full CRUD operations for quizzes, questions, and options.
- **Exam Attempting**: Track user attempts and answers.
- **Result Analysis**: Automatic grading and performance statistics.
- **Categories**: Organize quizzes by topic.

The project follows a **Layered Architecture (Controller-Service-Repository)** and implements multiple design patterns to ensure scalability and maintainability:

1.  **Repository Pattern**: Decouples business logic from data access.
2.  **Factory Pattern**: Used in `QuestionService` via `QuestionFactory` for standardized object creation.
3.  **Strategy Pattern**: Used in `QuizAttemptService` via `ScoringStrategy` for flexible grading logic.
4.  **Singleton Pattern**: Database connection pool is managed as a single instance.

## 📚 Documentation
- **[SRS Document](file:///c:/Users/IT/OneDrive/Documents/Qwizzy/SRS.md)**: Functional and non-functional requirements.
- **[Design & Architecture](file:///c:/Users/IT/OneDrive/Documents/Qwizzy/DESIGN.md)**: UML diagrams (Use Case, Class, Sequence) and pattern details.

## 📡 API Endpoints

### 🔐 Authentication & Users (`/api/users`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/signup` | Register a new user | Public |
| POST | `/signin` | Login and get JWT | Public |
| POST | `/verify-email` | Verify email with code | Public |
| POST | `/forgot-password` | Request reset code | Public |
| POST | `/verify-forgot-password-code` | Verify reset code | Public |
| POST | `/reset-password` | Set new password | Public |
| GET | `/` | Get all users | Admin |
| GET | `/stats` | Get user stats (points, score) | Auth |
| GET | `/:id` | Get user profile | Auth |
| PUT | `/` | Update own profile | Auth |
| DELETE | `/:id` | Delete user | Admin |

### 📁 Categories (`/api/categories`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/` | Create category | Admin |
| GET | `/` | Get all categories | Admin |
| GET | `/:id` | Get category by ID | Admin |
| PUT | `/:id` | Update category | Admin |
| DELETE | `/:id` | Delete category | Admin |

### 📝 Quizzes (`/api/quizzes`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/` | Create a quiz | Admin |
| GET | `/` | List all quizzes | Auth |
| GET | `/question_count` | List quizzes with counts | Auth |
| GET | `/:id` | Get quiz details | Auth |
| PUT | `/:id` | Update quiz | Admin |
| DELETE | `/:id` | Delete quiz | Admin |

### ❓ Questions & Options (`/api/questions`, `/api/options`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/api/questions` | Create question | Admin |
| GET | `/api/questions` | List all questions | Public |
| GET | `/api/questions/:id` | Get question | Public |
| GET | `/api/questions/quiz/:quiz_id` | Get quiz questions | Public |
| PUT | `/api/questions/:id` | Update question | Admin |
| DELETE | `/api/questions/:id` | Delete question | Admin |
| POST | `/api/options` | Create option | Admin |
| GET | `/api/options/question/:q_id` | Get options for question | Public |

### 🎯 Attempts & Results (`/api/quiz-attempts`, `/api/results`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/api/quiz-attempts` | Start a quiz attempt | Auth |
| POST | `/api/quiz-attempts/submit` | Submit answers & grade | Auth |
| GET | `/api/quiz-attempts` | List all attempts | Admin |
| GET | `/api/results` | List all results | Auth |
| GET | `/api/results/:id` | View detailed analysis | Auth |

## 🧪 Testing
The project uses **Jest** and **Supertest** for comprehensive testing, covering both Unit and Integration layers.

### Run all tests:
```bash
npm test
```

### Run tests with coverage report:
```bash
npx jest --coverage
```

Current achievement: **>50% overall code coverage**, with critical components like `UserRepository` and `AuthMiddleware` reaching **>70%**.

## 🛠️ Components
1.  **Controllers**: Handle HTTP requests and responses.
2.  **Services**: Contain business logic and orchestrate repositories.
3.  **Repositories**: Encapsulate raw SQL queries using `mysql2`.
4.  **Validators**: Data validation using `Joi`.
5.  **DTOs (Data Transfer Objects)**: Control data exposure (e.g., `UserDTO`).

### Design Patterns Used:
- **Repository Pattern**: Abstraction of data storage logic.
- **Factory Pattern**: Standardized creation of different question types.
- **Strategy Pattern**: Flexible scoring logic for quiz attempts.
- **Async Wrapper Pattern**: Centralized error handling for cleaner controllers.
- **Singleton Pattern**: Database connection management.

## 📂 Project Structure

```text
backend/
├── src/
│   ├── controllers/    # Request handling logic
│   ├── services/       # Business logic
│   ├── repositories/    # Database queries
│   ├── middleware/      # Auth, Error, Validation middlewares
│   ├── routes/         # API endpoints
│   ├── validators/      # Joi schemas
│   ├── utils/          # Helpers (JWT, Email, AsyncHandler, Patterns)
│   ├── dto/            # Data Transfer Objects
│   └── config/         # Database & environment config
├── tests/
│   ├── unit/           # Unit tests for services/middleware
│   ├── integration/    # API endpoint tests using Supertest
│   └── helpers/        # Mock data & test utilities
├── app.js              # Express app setup
└── server.js           # Server entry point
database/
└── qwizzy.sql          # MySQL Schema
```

## ⚙️ Setup & Installation

1.  **Clone the repository**.
2.  **Install dependencies**:
    ```bash
    cd backend
    npm install
    ```
3.  **Configure environment variables**:
    Create a `.env` file in the `backend/` directory:
    ```env
    NODE_ENV=development
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=your-sql-password
    DB_NAME=your-sql-database-name
    DB_PORT=3306
    JWT_SECRET=your-secret-key-here
    EMAIL_USER=[EMAIL_ADDRESS]
    EMAIL_PASS=your-app-password
    ```
4.  **Run the server**:
    ```bash
    npm run dev
    ```

## 📝 License

This project is for educational purposes as part of a Software Engineering course.
