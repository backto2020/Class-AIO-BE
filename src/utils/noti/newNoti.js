const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const newNoti = (notiObj) => {
  console.log('New a Noti: ', notiObj);
  return new Promise(async (res, rej) => {
    const { title, time, content, type } = notiObj;
    if (
      typeof title === 'undefined' ||
      typeof time === 'undefined' ||
      typeof content === 'undefined' ||
      typeof type === 'undefined'
    ) {
      res(new ErrObj(40215, '不满足字段非空的要求'));
      return;
    }
    if (time.constructor !== String) {
      res(new ErrObj(40216, 'time字段不满足ISOString格式'));
      return;
    }
    const time2 = time.slice(0, 19).replace('T', ' ');
    const insertSql = `
      insert into noti
      (title, time, content, type)
      values
      ('${title}', '${time2}', '${content}', '${type}')
    `;
    db.query(insertSql, (err, data) => {
      if (err) throw err;
      res(new ResObj('创建成功'));
    });
  });
};

module.exports = newNoti;
