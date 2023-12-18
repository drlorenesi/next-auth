const sql = require("mssql");

let db;

global.__db__ =
  global.__db__ ||
  new sql.ConnectionPool({
    user: "your_username",
    password: "your_password",
    server: "your_server",
    database: "your_database",
    options: {
      encrypt: true, // Use this if you're on Windows Azure
    },
  });

db = global.__db__;

async function connectToDatabase() {
  try {
    if (!db.connected) {
      await db.connect();
    }
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

// In a production environment, you might want to call connectToDatabase to establish the connection.
// In development, you might want to use a live-reload tool to restart your application when code changes.

// Example usage:
// connectToDatabase();

module.exports = { db, connectToDatabase };
