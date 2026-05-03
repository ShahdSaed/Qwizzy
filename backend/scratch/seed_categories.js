const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function seed_all_categories() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: parseInt(process.env.DB_PORT) || 3306
        });

        const all_categories = [
            // Original Categories
            { NAME: 'General Knowledge', description: 'Test your overall knowledge across various topics.' },
            { NAME: 'Science & Nature', description: 'Biology, Chemistry, Physics, and the natural world.' },
            { NAME: 'Technology & Computing', description: 'Gadgets, software, programming, and tech history.' },
            { NAME: 'History', description: 'Significant events, eras, and figures from the past.' },
            { NAME: 'Geography', description: 'Countries, cities, landmarks, and physical features of Earth.' },
            { NAME: 'Mathematics', description: 'Arithmetic, Algebra, Geometry, and logic puzzles.' },
            { NAME: 'Languages', description: 'Grammar, vocabulary, and linguistic curiosities.' },
            { NAME: 'Arts & Literature', description: 'Classic books, paintings, theater, and world cultures.' },
            { NAME: 'Sports', description: 'Football, Basketball, Olympics, and athletic trivia.' },
            { NAME: 'Entertainment', description: 'Movies, Music, Television, and Video Games.' },
            
            // Programming & Tech
            { NAME: 'Web Development', description: 'Front-end, Back-end, and modern web frameworks.' },
            { NAME: 'Mobile Development', description: 'Building apps for iOS, Android, and cross-platform solutions.' },
            { NAME: 'Artificial Intelligence', description: 'Machine Learning, Neural Networks, and Data Science.' },
            { NAME: 'Cyber Security', description: 'Ethical hacking, network security, and cryptography.' },
            { NAME: 'Game Development', description: 'Game engines, physics, and interactive design.' },
            { NAME: 'Database Management', description: 'SQL, NoSQL, and efficient data modeling.' },
            { NAME: 'Cloud Computing', description: 'AWS, Azure, Google Cloud, and serverless architecture.' },
            { NAME: 'DevOps & Infrastructure', description: 'CI/CD, Docker, Kubernetes, and system administration.' },
            { NAME: 'UI/UX Design', description: 'User experience, interface design principles, and prototyping.' },
            { NAME: 'Blockchain', description: 'Cryptocurrencies, smart contracts, and decentralized apps.' },

            // Specialized Knowledge
            { NAME: 'Astronomy & Space', description: 'Planets, stars, galaxies, and space exploration.' },
            { NAME: 'Psychology', description: 'Human behavior, mental processes, and social interaction.' },
            { NAME: 'Economics & Finance', description: 'Markets, investments, macroeconomics, and personal finance.' },
            { NAME: 'Health & Fitness', description: 'Nutrition, exercise, medicine, and healthy living.' },
            { NAME: 'Cooking & Gastronomy', description: 'Culinary techniques, ingredients, and world cuisines.' },
            { NAME: 'Environment & Sustainability', description: 'Ecology, climate change, and green technologies.' }
        ];

        console.log(`Seeding all categories (${all_categories.length} total)...`);

        for (const category of all_categories) {
            const id = uuidv4();
            await connection.query(
                'INSERT IGNORE INTO categories (id, NAME, description) VALUES (?, ?, ?)',
                [id, category.NAME, category.description]
            );
            console.log(`Ensured category: ${category.NAME}`);
        }

        console.log('Successfully seeded all categories!');
        await connection.end();
    } catch (err) {
        console.error('Seeding failed:', err);
    }
}

seed_all_categories();
