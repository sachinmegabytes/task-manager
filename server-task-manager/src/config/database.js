import mysql from "mysql2";

// configuration for creating pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root@123',
  database: 'test',
});

const promisePool = pool.promise();

pool.on("error", (err) => {
  throw new Error(err) // this will throw error
});

export default promisePool;
