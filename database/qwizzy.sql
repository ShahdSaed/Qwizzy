-- Online Quiz & Exam System - MySQL Schema
-- UTF-8 for Arabic content in titles/descriptions if needed

CREATE DATABASE IF NOT EXISTS quiz_exam_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE quiz_exam_db;

-- ---------------------------------------------------------------------------
-- Users (students + instructors + admins via role)
-- ---------------------------------------------------------------------------
CREATE TABLE users (
  id                     BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email                  VARCHAR(255) NOT NULL,
  password_hash          VARCHAR(255) NOT NULL,
  full_name              VARCHAR(150) NOT NULL,
  role                   ENUM('user', 'instructor') NOT NULL DEFAULT 'user',
  is_verified            TINYINT(1) NOT NULL DEFAULT 0,
  verification_code      VARCHAR(4) NULL,
  reset_password_code    VARCHAR(4) NULL,
  reset_password_expires TIMESTAMP NULL,
  created_at             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at             TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------------
-- Quizzes
-- ---------------------------------------------------------------------------
CREATE TABLE quizzes (
  id                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title              VARCHAR(255) NOT NULL,
  description        TEXT NULL,
  created_by_user_id BIGINT UNSIGNED NOT NULL,
  is_published       TINYINT(1) NOT NULL DEFAULT 0,
  time_limit_minutes SMALLINT UNSIGNED NULL COMMENT 'NULL = no limit',
  created_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_quizzes_created_by (created_by_user_id),
  KEY idx_quizzes_published (is_published),
  CONSTRAINT fk_quizzes_creator
    FOREIGN KEY (created_by_user_id) REFERENCES users (id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------------
-- Questions (MCQ / TRUE_FALSE — grading strategy differs per type)
-- ---------------------------------------------------------------------------
CREATE TABLE questions (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  quiz_id       BIGINT UNSIGNED NOT NULL,
  question_type ENUM('MCQ', 'TRUE_FALSE') NOT NULL,
  body          TEXT NOT NULL,
  points        DECIMAL(6,2) NOT NULL DEFAULT 1.00,
  sort_order    INT UNSIGNED NOT NULL DEFAULT 0,
  difficulty      ENUM('easy', 'medium', 'hard') NOT NULL DEFAULT 'medium',

  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_questions_quiz (quiz_id, sort_order),
  CONSTRAINT fk_questions_quiz
    FOREIGN KEY (quiz_id) REFERENCES quizzes (id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- One row per choice; exactly one is_correct = 1 per question (enforced in app / trigger optional)
CREATE TABLE question_options (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  question_id BIGINT UNSIGNED NOT NULL,
  label       VARCHAR(500) NOT NULL,
  is_correct  TINYINT(1) NOT NULL DEFAULT 0,
  sort_order  INT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_options_question (question_id, sort_order),
  CONSTRAINT fk_options_question
    FOREIGN KEY (question_id) REFERENCES questions (id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------------
-- Attempts (user takes a quiz once per "session" row; score filled on submit)
-- ---------------------------------------------------------------------------
CREATE TABLE quiz_attempts (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id       BIGINT UNSIGNED NOT NULL,
  quiz_id       BIGINT UNSIGNED NOT NULL,
  started_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  submitted_at  TIMESTAMP NULL DEFAULT NULL,
  score         DECIMAL(10,2) NULL DEFAULT NULL COMMENT 'NULL until graded',
  max_score     DECIMAL(10,2) NULL DEFAULT NULL COMMENT 'Sum of question points at submit time',
  PRIMARY KEY (id),
  KEY idx_attempts_user (user_id),
  KEY idx_attempts_quiz (quiz_id),
  KEY idx_attempts_submitted (submitted_at),
  CONSTRAINT fk_attempts_user
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_attempts_quiz
    FOREIGN KEY (quiz_id) REFERENCES quizzes (id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Selected option per question for this attempt
CREATE TABLE attempt_answers (
  id                   BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  quiz_attempt_id      BIGINT UNSIGNED NOT NULL,
  question_id          BIGINT UNSIGNED NOT NULL,
  selected_option_id   BIGINT UNSIGNED NOT NULL,
  is_correct           TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Snapshot after grading',
  earned_points        DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (id),
  UNIQUE KEY uq_attempt_question (quiz_attempt_id, question_id),
  KEY idx_attempt_answers_attempt (quiz_attempt_id),
  CONSTRAINT fk_aa_attempt
    FOREIGN KEY (quiz_attempt_id) REFERENCES quiz_attempts (id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_aa_question
    FOREIGN KEY (question_id) REFERENCES questions (id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_aa_selected_option
    FOREIGN KEY (selected_option_id) REFERENCES question_options (id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Categories (optional, used for filtering/organization)
CREATE TABLE categories (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100) NOT NULL,
  description TEXT NULL,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_name (name)
) ENGINE=InnoDB;

-- Quiz <-> Category mapping (many-to-many)
CREATE TABLE quiz_categories (
  quiz_id     BIGINT UNSIGNED NOT NULL,
  category_id INT UNSIGNED NOT NULL,

  PRIMARY KEY (quiz_id, category_id),

  CONSTRAINT fk_qc_quiz
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_qc_category
    FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- Results (pass/fail + score + percentage)
CREATE TABLE results (
  id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  quiz_attempt_id  BIGINT UNSIGNED NOT NULL,

  final_score      DECIMAL(10,2) NOT NULL,
  max_score        DECIMAL(10,2) NOT NULL,
  percentage       DECIMAL(5,2) NOT NULL,
  status           ENUM('pass', 'fail') NOT NULL,

  achieved_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_result_attempt (quiz_attempt_id),

  CONSTRAINT fk_results_attempt 
    FOREIGN KEY (quiz_attempt_id) REFERENCES quiz_attempts(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;