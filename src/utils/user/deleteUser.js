const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const deleteUser = (sid) => {
  console.log('Delete a User: ', sid);
  return new Promise(async (res, rej) => {
    if (typeof sid === 'undefined') {
      res(new ErrObj(40115, '未指定学号'));
    }
    const exist = await new Promise((res2, _) => {
      const checkExistSql = `select * from user where sid=${sid}`;
      db.query(checkExistSql, (err, data) => {
        if (err) throw err;
        if (data.length === 0) res2(new ErrObj(40122, '不存在该学号的记录'));
        res2(true);
      });
    });
    if (exist !== true) {
      res(exist);
      return;
    }
    const data = await new Promise((res2, _) => {
      let delSql = `delete from user where sid=${sid}`;
      console.log(delSql);
      db.query(delSql, (err, data) => {
        if (err) throw err;
        res2(new ResObj('删除成功'));
      });
    });
    res(data);
  });
};

module.exports = deleteUser;
