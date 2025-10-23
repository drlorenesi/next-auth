// Helpful MySQL commands to check server connections:
// SHOW STATUS WHERE Variable_name = 'Threads_connected';
// SHOW FULL PROCESSLIST;
// SELECT CONNECTION_ID() AS id;
// SHOW STATUS LIKE '%connect%';
// SHOW VARIABLES LIKE 'max_connections';

// TO DO: Implement proper error handling and logging as needed
// TO DO: Check if application is connected to the database before performing queries
// Error closing database pool: Error: Can't add new command when connection is in closed state
//     at closePool (lib/database.ts:41:34)
//     at process.<anonymous> (lib/database.ts:56:13)
//   39 |     const closePool = async () => {
//   40 |       try {
// > 41 |         await global._mysqlPool?.end();
//      |                                  ^
//   42 |         console.log("Database pool closed successfully");
//   43 |       } catch (error) {
//   44 |         console.error("Error closing database pool:", error); {
//   code: undefined,
//   errno: undefined,
//   sqlState: undefined,
//   sqlMessage: undefined
// }

// Get the client
import mysql, { PoolOptions } from "mysql2/promise";

// Extend the global type to include our custom property
declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

const access: PoolOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: Number(process.env.MYSQL_PORT) || 3306,
  timezone: "Z", // keep timestamps consistent
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

export let pool: mysql.Pool;

if (process.env.NODE_ENV === "development") {
  if (!global._mysqlPool) {
    global._mysqlPool = mysql.createPool(access);

    // Only register shutdown handlers once in development
    const closePool = async () => {
      try {
        await global._mysqlPool?.end();
        console.log("Database pool closed successfully");
      } catch (error) {
        console.error("Error closing database pool:", error);
      }
    };

    process.on("SIGTERM", async () => {
      console.log("SIGTERM received, closing database pool...");
      await closePool();
      process.exit(0);
    });

    process.on("SIGINT", async () => {
      console.log("SIGINT received, closing database pool...");
      await closePool();
      process.exit(0);
    });
  }
  pool = global._mysqlPool;
} else {
  pool = mysql.createPool(access);

  // Register shutdown handlers in production
  const closePool = async () => {
    try {
      await pool.end();
      console.log("Database pool closed successfully");
    } catch (error) {
      console.error("Error closing database pool:", error);
    }
  };

  // Handle shutdown signals sent by process managers
  // (like PM2, Docker, Kubernetes) for graceful shutdown
  process.on("SIGTERM", async () => {
    console.log("SIGTERM received, closing database pool...");
    await closePool();
    process.exit(0);
  });

  // Handle Ctrl+C event in local development
  process.on("SIGINT", async () => {
    console.log("SIGINT received, closing database pool...");
    await closePool();
    process.exit(0);
  });
}
