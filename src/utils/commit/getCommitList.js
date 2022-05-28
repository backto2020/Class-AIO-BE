const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const getCommitList = () => {
  return new Promise((res, _) => {
    let sql = `select * from commit`;
    db.query(sql, async (err, data) => {
      if (err) {
        res(new ErrObj(50400, 'Unknown error!'));
        throw err;
      }
      console.log(`return ${data.length} rows`);
      res(new ResObj('查询成功', data));
    });
  });
};

module.exports = getCommitList;
