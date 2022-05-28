const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const modifyCommit = (commit) => {
  console.log('Modify a Commit: ', commit);
  return new Promise(async (res, rej) => {
    const { id, title, begin, end, content, type } = commit;
    if (
      typeof id === 'undefined' ||
      typeof title === 'undefined' ||
      typeof begin === 'undefined' ||
      typeof end === 'undefined' ||
      typeof content === 'undefined' ||
      typeof type === 'undefined'
    ) {
      const err = new ErrObj(40415, '不满足字段非空的要求');
      console.error(err);
      res(err);
      return;
    }
    if (begin.constructor !== String || end.constructor !== String) {
      const err = new ErrObj(40316, 'begin 或 end 字段不满足ISOString格式');
      console.error(err);
      res(err);
      return;
    }
    const exist = await new Promise((res2, _) => {
      const checkExistSql = `select * from commit where id=${id}`;
      db.query(checkExistSql, (err, data) => {
        if (err) throw err;
        if (data.length === 0) {
          const err = new ErrObj(40422, '不存在编号的通知记录');
          console.error(err);
          res2(err);
          return;
        }
        res2(true);
      });
    });
    if (exist !== true) {
      res(exist);
      return;
    }
    commit.begin = begin.slice(0, 19).replace('T', ' ');
    commit.end = end.slice(0, 19).replace('T', ' ');
    const data = await new Promise((res2, _) => {
      let modiSql = `update commit set `;
      for (let key in commit) {
        modiSql += `${key}='${commit[key]}', `;
      }
      modiSql = modiSql.substring(0, modiSql.length - 2);
      modiSql += ` where id=${commit.id}`;

      console.log(modiSql);
      db.query(modiSql, (err, data) => {
        if (err) throw err;
        res2(new ResObj('修改成功'));
      });
    });
    res(data);
  });
};

module.exports = modifyCommit;
