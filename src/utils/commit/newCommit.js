const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const newCommit = (commit) => {
  console.log('New a Commit: ', commit);
  return new Promise(async (res, rej) => {
    const { title, begin, end, content, type } = commit;
    if (
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
      const err = new ErrObj(40416, 'begin 或 end 字段不满足ISOString格式');
      console.error(err);
      res(err);
      return;
    }
    const begin2 = begin.slice(0, 19).replace('T', ' ');
    const end2 = end.slice(0, 19).replace('T', ' ');
    const insertSql = `
      insert into commit
      (title, begin, end, content, type)
      values
      ('${title}', '${begin2}', '${end2}', '${content}', '${type}')
    `;
    db.query(insertSql, (err, data) => {
      if (err) throw err;
      res(new ResObj('创建成功'));
    });
  });
};

module.exports = newCommit;
