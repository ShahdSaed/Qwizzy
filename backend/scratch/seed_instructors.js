const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function seed_data() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT) || 3306
        });

        // 1. Get some category IDs
        const [categories] = await connection.query('SELECT id, NAME FROM categories');
        if (categories.length === 0) {
            console.error('No categories found. Please seed categories first.');
            process.exit(1);
        }

        const instructors = [
            { name: 'Dr. Ahmed Salem', email: 'ahmed@qwizzy.com' },
            { name: 'Eng. Sarah Connor', email: 'sarah@qwizzy.com' },
            { name: 'Prof. Michael Scott', email: 'michael@qwizzy.com' },
            { name: 'Laila Hassan', email: 'laila@qwizzy.com' },
            { name: 'John Doe', email: 'john@qwizzy.com' }
        ];

        const passwordHash = await bcrypt.hash('password123', 10);

        console.log('Seeding instructors and quizzes...');

        for (const inst of instructors) {
            const userId = uuidv4();
            // Insert Instructor
            await connection.query(
                'INSERT INTO users (id, email, password_hash, full_name, role, is_verified) VALUES (?, ?, ?, ?, "instructor", 1)',
                [userId, inst.email, passwordHash, inst.name]
            );
            console.log(`Added Instructor: ${inst.name}`);

            // Create 6 quizzes for this instructor
            for (let i = 1; i <= 6; i++) {
                const quizId = uuidv4();
                const randomCat = categories[Math.floor(Math.random() * categories.length)];
                const difficulty = ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)];
                
                await connection.query(
                    'INSERT INTO quizzes (id, category_id, title, description, created_by_user_id, is_published, time_limit_minutes, difficulty) VALUES (?, ?, ?, ?, ?, 1, ?, ?)',
                    [
                        quizId, 
                        randomCat.id, 
                        `${randomCat.NAME} Quiz ${i} by ${inst.name.split(' ')[1]}`, 
                        `An exciting quiz about ${randomCat.NAME}. Master your skills!`,
                        userId,
                        15 + (i * 5),
                        difficulty
                    ]
                );
            }
            console.log(`  Added 6 quizzes for ${inst.name}`);
        }

        console.log('Successfully seeded all data!');
        await connection.end();
    } catch (err) {
        console.error('Seeding failed:', err);
    }
}

seed_data();
