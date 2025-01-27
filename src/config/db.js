const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',  // Default to localhost if not set
    user: process.env.DB_USER || 'root',        // Default user
    password: process.env.DB_PASSWORD || '',    // Default empty password
    database: process.env.DB_NAME || 'test',    // Default database name
    port: process.env.DB_PORT || 3306,          // Default MySQL port
    connectTimeout: 10000                        // Optional timeout (10 seconds)
  });
  

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);  // Exit the process if connection fails
  } else {
    console.log('Connected to MySQL database');
  }
});

// Graceful shutdown to close DB connection on app termination
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('Error closing database connection:', err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});


module.exports = db;
