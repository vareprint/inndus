// lib/db.js
import mysql from "mysql2/promise";

let pool;

export async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost",
      user: "vareprint_internal",
      password: "Vareprint@25",
      database: "vareprint_inndus_interanal",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
}
