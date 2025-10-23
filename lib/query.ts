import { pool } from "./database";

/**
 * Execute a MySQL query with prepared statements
 * @param sql - SQL query string with ? placeholders
 * @param values - Array of values to bind to the query
 * @returns Query results
 */
// Example usage:
// const sql = `SELECT ? AS StartDate, ? AS EndDate`;
// const params = ["2025-10-01", "2025-10-31"];
// const { rows, fields, duration } = await query(sql, params);
export async function query(sql: string, values: any[] = []) {
  try {
    const start = Date.now();
    const [rows, fields] = await pool.execute(sql, values);
    const duration = Date.now() - start;
    return { rows, fields, duration };
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
