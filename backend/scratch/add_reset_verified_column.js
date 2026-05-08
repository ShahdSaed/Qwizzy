require('dotenv').config();
const { db } = require('../src/config/db');

async function run() {
  try {
    console.log('Adding is_reset_verified column to users table...');
    await db.query('ALTER TABLE users ADD COLUMN is_reset_verified TINYINT(1) NOT NULL DEFAULT 0;');
    console.log('Column added successfully!');
  } catch (error) {
    if (error.code === 'ER_DUP_COLUMN_NAME') {
      console.log('Column already exists.');
    } else {
      console.error('Error adding column:', error);
    }
  } finally {
    process.exit();
  }
}

run();
