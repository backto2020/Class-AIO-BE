const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

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
      return;
    }
    const regx = /^(19[7-9][0-9]|20[012][0-9])-(1[0-2]|0?[1-9])-([1-2][0-9]|3[01]|0?[1-9])$/;
    // test: 1970-1-1 1970-01-01 1969-01-01 1979-7-01 2030-12-21 2022-01-31 2022-12-31
    if (!regx.test(userObj.birthday)) {
      res(new ErrObj(40116, '生日非有效值或格式错误'));
      return;
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
        res2(new ResObj('创建成功'));
      });
    });
    res(data);
  });
};

module.exports = newUser;
