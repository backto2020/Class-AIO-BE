const db = require('../db');
const ErrObj = require('../../utils/ErrObj');

const newUser = (userObj) => {
  console.log('New a User: ', userObj);
  return new Promise(async (res, rej) => {
    const { sid, username, password, name, avatar, gender, birthday, school, major, grade, admin } =
      userObj;
    if (
      typeof sid === 'undefined' ||
      typeof username === 'undefined' ||
      typeof password === 'undefined' ||
      typeof name === 'undefined' ||
      typeof avatar === 'undefined' ||
      typeof gender === 'undefined' ||
      typeof birthday === 'undefined' ||
      typeof school === 'undefined' ||
      typeof major === 'undefined' ||
      typeof grade === 'undefined' ||
      typeof admin === 'undefined'
    ) {
      res(new ErrObj(40115, '不满足字段非空的要求'));
    }
    const dup = await new Promise((res2, _) => {
      const checkDuplicateSql = `select * from user where sid=${sid} or username='${username}'`;
      db.query(checkDuplicateSql, (err, data) => {
        if (err) throw err;
        if (data.length !== 0) res2(new ErrObj(40122, '存在学号或用户名重复的记录'));
        res2(0);
      });
    });
    if (dup !== 0) {
      res(dup);
      return;
    }
    const data = await new Promise((res2, _) => {
      const insertSql = `insert into user values (${sid}, '${username}', '${password}', '${name}', '${avatar}', '${gender}', '${birthday}', '${school}', '${major}', ${grade}, ${admin})`;
      db.query(insertSql, (err, data) => {
        if (err) throw err;
        res2({
          code: 20000,
          message: '创建成功'
        });
      });
    });
    res(data);
  });
};

module.exports = newUser;
