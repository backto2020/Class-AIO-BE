const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const logCommit = (sid, cid) => {
  console.log(`User ${sid} login commit: ${cid}...`);
  return new Promise(async (res, rej) => {
    if (isNaN(parseInt(sid) || isNaN(parseInt(cid)))) {
      const err = new ErrObj(40415, '学号或提交ID无效');
      console.error(err);
      res(err);
      return;
    }
    const dup = await new Promise((res2, _) => {
      const checkDuplicateSql = `select * from commit_log where sid=${sid} and cid='${cid}'`;
      db.query(checkDuplicateSql, (err, data) => {
        if (err) throw err;
        if (data.length !== 0) res2(new ErrObj(40322, '已存在提交记录'));
        res2(0);
      });
    });
    const insertSql = `
      insert into commit_log
      (sid, cid, time)
      values
      (${sid}, ${cid}, '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')
    `;
    const updateSql = `
      update commit_log set
        time=${new Date().toISOString().slice(0, 19).replace('T', ' ')}
      where sid=${sid} and cid=${cid}
    `;
    const sql = dup !== 0 ? updateSql : insertSql;
    db.query(sql, (err, data) => {
      if (err) throw err;
      res(new ResObj('提交成功'));
    });
  });
};

module.exports = logCommit;
