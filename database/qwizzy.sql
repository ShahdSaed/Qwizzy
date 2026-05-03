-- Online Quiz & Exam System - MySQL Schema (UUID Version)
-- UTF-8 for Arabic content in titles/descriptions

CREATE DATABASE IF NOT EXISTS db48640
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE db48640;

-- ---------------------------------------------------------------------------
-- Users
-- ---------------------------------------------------------------------------
CREATE TABLE users (
  id                     VARCHAR(36) NOT NULL,
  email                  VARCHAR(255) NOT NULL,
  password_hash          VARCHAR(255) NOT NULL,
  full_name              VARCHAR(150) NOT NULL,
  role                   ENUM('user', 'instructor') NOT NULL DEFAULT 'user',
  verification_code      VARCHAR(4) NULL,
  is_verified            TINYINT(1) NOT NULL DEFAULT 0,
  reset_password_code    VARCHAR(4) NULL,
  reset_password_expires TIMESTAMP NULL,
  created_at             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ---------------------------------------------------------------------------
-- Categories
-- ---------------------------------------------------------------------------
CREATE TABLE categories (
  id          VARCHAR(36) NOT NULL,
  NAME        VARCHAR(100) NOT NULL,
  description TEXT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_name (NAME)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ---------------------------------------------------------------------------
-- Quizzes
-- ---------------------------------------------------------------------------
CREATE TABLE quizzes (
  id                 VARCHAR(36) NOT NULL,
  category_id        VARCHAR(36) NOT NULL,
  title              VARCHAR(255) NOT NULL,
  description        TEXT NULL,
  created_by_user_id VARCHAR(36) NOT NULL,
  is_published       TINYINT(1) NOT NULL DEFAULT 0,
  time_limit_minutes SMALLINT UNSIGNED NULL COMMENT 'NULL = no limit',
  difficulty         ENUM('easy', 'medium', 'hard') NOT NULL,
  created_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_quizzes_created_by (created_by_user_id),
  KEY idx_quizzes_published (is_published),
  CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_user1 FOREIGN KEY (created_by_user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ---------------------------------------------------------------------------
-- Questions
-- ---------------------------------------------------------------------------
CREATE TABLE questions (
  id            VARCHAR(36) NOT NULL,
  quiz_id       VARCHAR(36) NOT NULL,
  question_type ENUM('MCQ', 'TRUE_FALSE') NOT NULL,
  body          TEXT NOT NULL,
  points        DECIMAL(6,2) NOT NULL DEFAULT 1.00,
  sort_order    INT UNSIGNED NOT NULL DEFAULT 0,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_questions_quiz (quiz_id),
  CONSTRAINT fk_questions_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ---------------------------------------------------------------------------
-- Question Options
-- ---------------------------------------------------------------------------
CREATE TABLE question_options (
  id          VARCHAR(36) NOT NULL,
  question_id VARCHAR(36) NOT NULL,
  label       VARCHAR(500) NOT NULL,
  is_correct  TINYINT(1) NOT NULL DEFAULT 0,
  sort_order  INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_options_question (question_id),
  CONSTRAINT fk_options_question FOREIGN KEY (question_id) REFERENCES questions (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ---------------------------------------------------------------------------
-- Quiz Attempts
-- ---------------------------------------------------------------------------
CREATE TABLE quiz_attempts (
  id            VARCHAR(36) NOT NULL,
  user_id       VARCHAR(36) NOT NULL,
  quiz_id       VARCHAR(36) NOT NULL,
  started_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  submitted_at  TIMESTAMP NULL DEFAULT NULL,
  score         DECIMAL(10,2) NULL DEFAULT NULL,
  max_score     DECIMAL(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_attempts_user (user_id),
  KEY idx_attempts_quiz (quiz_id),
  KEY idx_attempts_submitted (submitted_at),
  CONSTRAINT fk_attempts_user FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_attempts_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ---------------------------------------------------------------------------
-- Attempt Answers
-- ---------------------------------------------------------------------------
CREATE TABLE attempt_answers (
  id                   VARCHAR(36) NOT NULL,
  quiz_attempt_id      VARCHAR(36) NOT NULL,
  question_id          VARCHAR(36) NOT NULL,
  selected_option_id   VARCHAR(36) NOT NULL,
  is_correct           TINYINT(1) NOT NULL DEFAULT 0,
  earned_points        DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (id),
  KEY idx_aa_attempt (quiz_attempt_id),
  KEY idx_aa_question (question_id),
  KEY idx_aa_selected_option (selected_option_id),
  CONSTRAINT fk_aa_attempt FOREIGN KEY (quiz_attempt_id) REFERENCES quiz_attempts (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_aa_question FOREIGN KEY (question_id) REFERENCES questions (id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_aa_selected_option FOREIGN KEY (selected_option_id) REFERENCES question_options (id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ---------------------------------------------------------------------------
-- Results
-- ---------------------------------------------------------------------------
CREATE TABLE results (
  id               VARCHAR(36) NOT NULL,
  quiz_attempt_id  VARCHAR(36) NOT NULL,
  final_score      DECIMAL(10,2) NOT NULL,
  max_score        DECIMAL(10,2) NOT NULL,
  percentage       DECIMAL(5,2) NOT NULL,
  STATUS           ENUM('pass', 'fail') NOT NULL,
  achieved_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_result_attempt (quiz_attempt_id),
  CONSTRAINT fk_results_attempt FOREIGN KEY (quiz_attempt_id) REFERENCES quiz_attempts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;