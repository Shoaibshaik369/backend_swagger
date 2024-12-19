const mysql = require('mysql2');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',   // MySQL host
  user: 'root',        // Your MySQL username
  password: 'Shoaib@123',  // Your MySQL password
  database: 'hospital',    // The name of your database
  port: 3306,              // MySQL port (default is 3306)
  multipleStatements: true // Enable if executing multiple SQL statements in one query
});

// Test the connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.code, err.sqlMessage || err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Export the connection for use in other modules
module.exports = connection;
