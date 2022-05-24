const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'se_web',
  user: 'root',
  password: 'SeWeb@19'
});

function query(sql, callback) {
  pool.getConnection((err, conn) => {
    conn.query(sql, (err, rows) => {
      callback(err, rows);
      conn.release();
    });
  });
}

exports.query = query;
