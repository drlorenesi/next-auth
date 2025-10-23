import { pool } from "./database";
import {
  RowDataPacket,
  ResultSetHeader,
  FieldPacket,
  OkPacket,
} from "mysql2/promise";

/**
 * Generic query result type
 */
export interface QueryResult<T> {
  rows: T;
  fields: FieldPacket[];
  duration: number;
}

/**
 * Options for SELECT queries
 */
export interface SelectOptions {
  orderBy?: string;
  limit?: number;
  offset?: number;
}

/**
 * WHERE clause conditions
 */
export type WhereConditions = Record<string, string | number | boolean | null>;

/**
 * Data object for INSERT/UPDATE operations
 */
export type DataObject = Record<
  string,
  string | number | boolean | null | Date
>;

/**
 * Transaction callback connection type
 */
export interface TransactionConnection {
  execute: (
    sql: string,
    values?: unknown[]
  ) => Promise<[RowDataPacket[] | OkPacket | ResultSetHeader, FieldPacket[]]>;
  query: (
    sql: string,
    values?: unknown[]
  ) => Promise<[RowDataPacket[] | OkPacket | ResultSetHeader, FieldPacket[]]>;
}

/**
 * Execute a raw MySQL query with prepared statements
 * @param sql - SQL query string with ? placeholders
 * @param values - Array of values to bind to the query
 * @returns Query results
 */
export async function query<T = RowDataPacket[] | ResultSetHeader | OkPacket>(
  sql: string,
  values: unknown[] = []
): Promise<QueryResult<T>> {
  try {
    const start = Date.now();
    const [rows, fields] = await pool.execute(sql, values);
    const duration = Date.now() - start;
    return { rows: rows as T, fields, duration };
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

/**
 * SELECT query - Returns typed rows
 * @param table - Table name
 * @param columns - Columns to select (default: '*')
 * @param where - WHERE clause conditions as object
 * @param options - Additional options (orderBy, limit, offset)
 * @returns Array of rows matching the query
 */
export async function select<T extends RowDataPacket>(
  table: string,
  columns: string | string[] = "*",
  where?: WhereConditions,
  options?: SelectOptions
): Promise<QueryResult<T[]>> {
  const cols = Array.isArray(columns) ? columns.join(", ") : columns;
  let sql = `SELECT ${cols} FROM ${table}`;
  const values: unknown[] = [];

  // Add WHERE clause
  if (where && Object.keys(where).length > 0) {
    const conditions = Object.keys(where).map((key) => {
      values.push(where[key]);
      return `${key} = ?`;
    });
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  // Add ORDER BY
  if (options?.orderBy) {
    sql += ` ORDER BY ${options.orderBy}`;
  }

  // Add LIMIT
  if (options?.limit) {
    sql += ` LIMIT ?`;
    values.push(options.limit);
  }

  // Add OFFSET
  if (options?.offset) {
    sql += ` OFFSET ?`;
    values.push(options.offset);
  }

  return query<T[]>(sql, values);
}

/**
 * SELECT a single row
 * @param table - Table name
 * @param columns - Columns to select (default: '*')
 * @param where - WHERE clause conditions as object
 * @returns Single row or null
 */
export async function selectOne<T extends RowDataPacket>(
  table: string,
  columns: string | string[] = "*",
  where?: WhereConditions
): Promise<QueryResult<T | null>> {
  const result = await select<T>(table, columns, where, { limit: 1 });
  return {
    ...result,
    rows: result.rows.length > 0 ? result.rows[0] : null,
  };
}

/**
 * INSERT query - Inserts a new row
 * @param table - Table name
 * @param data - Object with column-value pairs
 * @returns Insert result with insertId and affectedRows
 */
export async function insert(
  table: string,
  data: DataObject
): Promise<QueryResult<ResultSetHeader>> {
  const columns = Object.keys(data);
  const values = Object.values(data);
  const placeholders = columns.map(() => "?").join(", ");

  const sql = `INSERT INTO ${table} (${columns.join(
    ", "
  )}) VALUES (${placeholders})`;

  return query<ResultSetHeader>(sql, values);
}

/**
 * INSERT multiple rows in a single query
 * @param table - Table name
 * @param data - Array of objects with column-value pairs
 * @returns Insert result with insertId and affectedRows
 */
export async function insertMany(
  table: string,
  data: DataObject[]
): Promise<QueryResult<ResultSetHeader>> {
  if (data.length === 0) {
    throw new Error("Cannot insert empty array");
  }

  const columns = Object.keys(data[0]);
  const placeholders = data
    .map(() => `(${columns.map(() => "?").join(", ")})`)
    .join(", ");
  const values = data.flatMap((row) => columns.map((col) => row[col]));

  const sql = `INSERT INTO ${table} (${columns.join(
    ", "
  )}) VALUES ${placeholders}`;

  return query<ResultSetHeader>(sql, values);
}

/**
 * UPDATE query - Updates existing rows
 * @param table - Table name
 * @param data - Object with column-value pairs to update
 * @param where - WHERE clause conditions as object
 * @returns Update result with affectedRows
 */
export async function update(
  table: string,
  data: DataObject,
  where?: WhereConditions
): Promise<QueryResult<ResultSetHeader>> {
  const setColumns = Object.keys(data);
  const setValues = Object.values(data);
  const setClauses = setColumns.map((col) => `${col} = ?`).join(", ");

  let sql = `UPDATE ${table} SET ${setClauses}`;
  const values: unknown[] = [...setValues];

  // Add WHERE clause
  if (where && Object.keys(where).length > 0) {
    const conditions = Object.keys(where).map((key) => {
      values.push(where[key]);
      return `${key} = ?`;
    });
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  return query<ResultSetHeader>(sql, values);
}

/**
 * DELETE query - Deletes rows
 * @param table - Table name
 * @param where - WHERE clause conditions as object
 * @returns Delete result with affectedRows
 */
export async function deleteFrom(
  table: string,
  where?: WhereConditions
): Promise<QueryResult<ResultSetHeader>> {
  let sql = `DELETE FROM ${table}`;
  const values: unknown[] = [];

  // Add WHERE clause
  if (where && Object.keys(where).length > 0) {
    const conditions = Object.keys(where).map((key) => {
      values.push(where[key]);
      return `${key} = ?`;
    });
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  return query<ResultSetHeader>(sql, values);
}

/**
 * Execute a transaction with multiple queries
 * @param callback - Async function that receives a connection and executes queries
 * @returns Result from the callback
 */
export async function transaction<T>(
  callback: (connection: TransactionConnection) => Promise<T>
): Promise<T> {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    console.error("Transaction error:", error);
    throw error;
  } finally {
    connection.release();
  }
}
