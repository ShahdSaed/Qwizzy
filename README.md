# Qwizzy - Online Quiz & Exam System

Qwizzy is a robust, layered-architecture backend for an online quiz and examination system. Built with Node.js, Express, and MySQL, it follows professional software engineering standards, including Clean Code, SOLID principles, and design patterns.

## 🚀 Key Features

- **Authentication System**: Secure sign-up, sign-in, email verification, and password reset.
- **Role-Based Access Control**: Different permissions for Users and Instructors.
- **Quiz Management**: Full CRUD operations for quizzes, questions, and options.
- **Exam Attempting**: Track user attempts and answers.
- **Result Analysis**: Automatic grading and performance statistics.
- **Categories**: Organize quizzes by topic.

## 🛠️ Architecture & Design Patterns

The project follows a **Layered Architecture (Controller-Service-Repository)** to ensure separation of concerns:

1.  **Controllers**: Handle HTTP requests and responses (standardized via `asyncHandler`).
2.  **Services**: Contain business logic and orchestrate repositories.
3.  **Repositories**: Encapsulate raw SQL queries using `mysql2`.
4.  **Validators**: Data validation using `Joi`.
5.  **DTOs (Data Transfer Objects)**: Control data exposure (e.g., `UserDTO`).

### Design Patterns Used:
- **Repository Pattern**: Abstraction of data storage logic.
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
│   ├── utils/          # Helpers (JWT, Email, AsyncHandler)
│   ├── dto/            # Data Transfer Objects
│   └── config/         # Database & environment config
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
    PORT=3000
    DB_HOST=your_host
    DB_USER=your_user
    DB_PASS=your_password
    DB_NAME=your_db
    JWT_SECRET=your_secret
    EMAIL_USER=your_email
    EMAIL_PASS=your_app_password
    ```
4.  **Run the server**:
    ```bash
    npm run dev
    ```

## 🧪 Testing

Run unit tests using:
```bash
npm test
```

## 📝 License

This project is for educational purposes as part of a Software Engineering course.
