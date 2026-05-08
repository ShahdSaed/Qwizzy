const mysql = require("mysql2/promise");

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT || 3306;

if (!dbName || !dbUser || !dbHost) {
  throw new Error(
    "Missing database environment variables. Required: DB_NAME, DB_USER, DB_HOST."
  );
}

const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000
});

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL successfully");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
  }
};

module.exports = { db: pool, connectDB };