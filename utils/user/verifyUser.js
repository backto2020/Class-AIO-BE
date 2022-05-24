const jwt = require('jsonwebtoken');
const jwtKey = require('./jwtKey');
const db = require('../db');

const verifyUser = (username, password) => {
  console.log(`login with name: ${username}, password: ${password}`);
  if (!username || !password) return '';
  const sql = `select * from user where username='${username}'`;
  return new Promise((res, rej) => {
    db.query(sql, (err, data) => {
      if (err) throw err;
      if (data.length === 0)
        res({
          code: 50040,
          message: '没有该账号'
        });
      else if (data[0].password !== password)
        res({
          code: 50041,
          message: '密码错误'
        });
      else {
        const token = jwt.sign({ username, password }, jwtKey, { expiresIn: '7d' });
        console.log(token);
        res({
          code: 20000,
          message: '登陆成功',
          data: { token }
        });
      }
    });
  });
};

module.exports = verifyUser;
