// lib/db.js
import mysql from "mysql2/promise";

let pool;

export async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "inndus_new",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}
