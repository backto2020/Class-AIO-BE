const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const getNotiList = () => {
  return new Promise((res, _) => {
    let sql = `select * from noti`;
    db.query(sql, (err, data) => {
      if (err) {
        res(new ErrObj(50200, 'Unknown error!'));
        throw err;
      }
      console.log(`return ${data.length} rows`);
      res(new ResObj('查询成功', data));
    });
  });
};

module.exports = getNotiList;
