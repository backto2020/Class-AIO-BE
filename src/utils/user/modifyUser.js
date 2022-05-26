const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const modifyUser = (userObj) => {
  console.log('Modify a User: ', userObj);
  return new Promise(async (res, rej) => {
    const { sid, username, password, name, avatar, gender, birthday, school, major, grade, admin } =
      userObj;
    if (typeof sid === 'undefined') {
      res(new ErrObj(40115, '未指定学号'));
    }
    const exist = await new Promise((res2, _) => {
      const checkDuplicateSql = `select * from user where sid=${sid} or username='${username}'`;
      db.query(checkDuplicateSql, (err, data) => {
        if (err) throw err;
        if (data.length === 0) res2(new ErrObj(40122, '不存在该学号或用户名的记录'));
        res2(true);
      });
    });
    if (exist !== true) {
      res(exist);
      return;
    }
    const data = await new Promise((res2, _) => {
      let modiSql = `update user set `;
      for (let key in userObj) {
        modiSql += `${key}='${userObj[key]}', `;
      }
      modiSql = modiSql.substring(0, modiSql.length - 2);
      modiSql += ` where sid=${userObj.sid}`;

      console.log(modiSql);
      db.query(modiSql, (err, data) => {
        if (err) throw err;
        res2(new ResObj('修改成功'));
      });
    });
    res(data);
  });
};

module.exports = modifyUser;
