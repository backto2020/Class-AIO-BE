const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const getCommitStatus = (id) => {
  return new Promise(async (res, rej) => {
    if (isNaN(parseInt(id))) {
      const err = new ErrObj(40415, '学号或提交ID无效');
      console.error(err);
      res(err);
      return;
    }
    const getCommitted = new Promise((res2, _) => {
      const committedSql = `
        select u.sid, u.name, c.time
        from user u, commit_log c
        where u.sid=c.sid and c.cid=${id};
      `;
      db.query(committedSql, (err, data) => {
        if (err) throw err;
        res2(data);
      });
    });
    const getUncommit = new Promise((res2, _) => {
      const uncommitSql = `
        select distinct u.sid, u.name
        from user u, commit_log c
        where u.sid not in (
          select sid
          from commit_log
          where sid=u.sid and cid=${id}
        );
      `;
      db.query(uncommitSql, (err, data) => {
        if (err) throw err;
        res2(data);
      });
    });
    Promise.all([getCommitted, getUncommit])
      .then((values) => {
        res(
          new ResObj('查询成功', {
            committed: values[0],
            uncommit: values[1]
          })
        );
      })
      .catch((err) => {
        console.error(err);
        res(new ErrObj(50400, '未知错误'));
      });
  });
};

module.exports = getCommitStatus;
