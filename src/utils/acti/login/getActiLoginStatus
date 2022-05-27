const db = require('../../db');
const ErrObj = require('../../ErrObj');
const ResObj = require('../../ResObj');

const getActiLoginStatus = (id) => {
  return new Promise(async (res, rej) => {
    if (isNaN(parseInt(id))) {
      const err = new ErrObj(40315, '学号或活动ID无效');
      console.error(err);
      res(err);
      return;
    }
    const getLogined = new Promise((res2, _) => {
      const loginedSql = `
        select distinct u.sid, u.name
        from user u
        where u.sid in (
          select a.sid
          from acti_login a
          where a.sid=u.sid and a.aid=${id}
        );
      `;
      db.query(loginedSql, (err, data) => {
        if (err) throw err;
        res2(data);
      });
    });
    const getUnlogin = new Promise((res2, _) => {
      const unloginSql = `
        select distinct u.sid, u.name
        from user u
        where u.sid not in (
          select a.sid
          from acti_login a
          where a.sid=u.sid and a.aid=${id}
        );
      `;
      db.query(unloginSql, (err, data) => {
        if (err) throw err;
        res2(data);
      });
    });
    Promise.all([getLogined, getUnlogin])
      .then((values) => {
        res(
          new ResObj('查询成功', {
            logined: values[0],
            unlogin: values[1]
          })
        );
      })
      .catch((err) => {
        console.error(err);
        res(new ErrObj(50300, '未知错误'));
      });
  });
};

module.exports = getActiLoginStatus;
