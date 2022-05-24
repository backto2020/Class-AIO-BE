const jwt = require('jsonwebtoken');
const jwtKey = require('./jwtKey');
const db = require('../db');
const ErrObj = require('../../utils/ErrObj');

const verifyUser = (username, password) => {
  console.log(`login with name: ${username}, password: ${password}`);
  return new Promise((res, rej) => {
    if (!username || !password) res(new ErrObj(50010, '账号或密码格式错误'));
    const sql = `select * from user where username='${username}'`;
    db.query(sql, (err, data) => {
      if (err) throw err;
      if (data.length === 0) res(new ErrObj(50040, '没有该账号'));
      else if (data[0].password !== password) res(new ErrObj(50041, '密码错误'));
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
