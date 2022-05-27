const db = require('../../db');
const ErrObj = require('../../ErrObj');
const ResObj = require('../../ResObj');

const loginActi = (sid, aid) => {
  console.log(`User ${sid} login acti: ${aid}...`);
  return new Promise(async (res, rej) => {
    if (isNaN(parseInt(sid) || isNaN(parseInt(aid)))) {
      const err = new ErrObj(40315, '学号或活动ID无效');
      console.error(err);
      res(err);
      return;
    }
    const dup = await new Promise((res2, _) => {
      const checkDuplicateSql = `select * from acti_login where sid=${sid} and aid='${aid}'`;
      db.query(checkDuplicateSql, (err, data) => {
        if (err) throw err;
        if (data.length !== 0) res2(new ErrObj(40322, '已存在签到记录'));
        res2(0);
      });
    });
    if (dup !== 0) {
      console.error(dup);
      res(dup);
      return;
    }
    const insertSql = `
      insert into acti_login
      (sid, aid, time)
      values
      (${sid}, ${aid}, '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')
    `;
    db.query(insertSql, (err, data) => {
      if (err) throw err;
      res(new ResObj('签到成功'));
    });
  });
};

module.exports = loginActi;
