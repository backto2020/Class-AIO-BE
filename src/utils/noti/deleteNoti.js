const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const deleteNoti = (id) => {
  console.log('Delete a Noti: ', id);
  return new Promise(async (res, rej) => {
    if (typeof id === 'undefined') {
      res(new ErrObj(40215, '未指定通知ID'));
    }
    const exist = await new Promise((res2, _) => {
      const checkExistSql = `select * from noti where id=${id}`;
      db.query(checkExistSql, (err, data) => {
        if (err) throw err;
        if (data.length === 0) res2(new ErrObj(40222, '不存在该ID的记录'));
        res2(true);
      });
    });
    if (exist !== true) {
      res(exist);
      return;
    }
    const data = await new Promise((res2, _) => {
      let delSql = `delete from noti where id=${id}`;
      console.log(delSql);
      db.query(delSql, (err, data) => {
        if (err) throw err;
        res2(new ResObj('删除成功'));
      });
    });
    res(data);
  });
};

module.exports = deleteNoti;
