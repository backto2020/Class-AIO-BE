const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const getActiList = () => {
  return new Promise((res, _) => {
    let sql = `select * from acti`;
    db.query(sql, (err, data) => {
      if (err) {
        res(new ErrObj(50300, 'Unknown error!'));
        throw err;
      }
      console.log(`return ${data.length} rows`);
      res(new ResObj('查询成功', data));
    });
  });
};

module.exports = getActiList;
