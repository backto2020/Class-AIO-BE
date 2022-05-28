const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const deleteCommit = (id) => {
  console.log('Delete a Commit: ', id);
  return new Promise(async (res, rej) => {
    if (isNaN(parseInt(id))) {
      const err = new ErrObj(40415, '未指定提交ID');
      console.error(err);
      res(err);
      return;
    }
    const exist = await new Promise((res2, _) => {
      const checkExistSql = `select * from commit where id=${id}`;
      db.query(checkExistSql, (err, data) => {
        if (err) throw err;
        if (data.length === 0) {
          const err = new ErrObj(40422, '不存在该ID的记录');
          console.log(err);
          res2(err);
        }
        res2(true);
      });
    });
    if (exist !== true) {
      res(exist);
      return;
    }
    const data = await new Promise((res2, _) => {
      let delSql = `delete from commit where id=${id}`;
      console.log(delSql);
      db.query(delSql, (err, data) => {
        if (err) throw err;
        res2(new ResObj('删除成功'));
      });
    });
    res(data);
  });
};

module.exports = deleteCommit;
