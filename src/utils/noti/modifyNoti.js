const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const modifyNoti = (noti) => {
  console.log('Modify a Noti: ', noti);
  return new Promise(async (res, rej) => {
    const { id, title, time, content, type } = noti;
    if (
      typeof title === 'undefined' ||
      typeof time === 'undefined' ||
      typeof content === 'undefined' ||
      typeof type === 'undefined'
    ) {
      const err = new ErrObj(40215, '不满足字段非空的要求');
      console.error(err);
      res(err);
      return;
    }
    if (time.constructor !== String) {
      const err = new ErrObj(40216, 'time字段不满足ISOString格式');
      console.error(err);
      res(err);
      return;
    }
    const exist = await new Promise((res2, _) => {
      const checkExistSql = `select * from noti where id=${id}`;
      db.query(checkExistSql, (err, data) => {
        if (err) throw err;
        if (data.length === 0) res2(new ErrObj(40222, '不存在编号的通知记录'));
        res2(true);
      });
    });
    if (exist !== true) {
      console.log(exist);
      res(exist);
      return;
    }
    noti.time = time.slice(0, 19).replace('T', ' ');
    const data = await new Promise((res2, _) => {
      let modiSql = `update noti set `;
      for (let key in noti) {
        modiSql += `${key}='${noti[key]}', `;
      }
      modiSql = modiSql.substring(0, modiSql.length - 2);
      modiSql += ` where id=${noti.id}`;

      console.log(modiSql);
      db.query(modiSql, (err, data) => {
        if (err) throw err;
        res2(new ResObj('修改成功'));
      });
    });
    res(data);
  });
};

module.exports = modifyNoti;
