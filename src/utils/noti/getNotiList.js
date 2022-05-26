const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const getUserList = () => {
  return new Promise((res, _) => {
    let sql = `select * from noti`;
    console.log(`return ${sql.length} rows`);
    db.query(sql, (err, data) => {
      if (err) {
        res(new ErrObj(50200, 'Unknown error!'));
        throw err;
      }
      res(new ResObj('查询成功', data));
    });
  });
};

module.exports = getUserList;
