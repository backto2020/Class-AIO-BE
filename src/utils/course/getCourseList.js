const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const getCourseList = () => {
  return new Promise((res, _) => {
    let sql = `select * from course`;
    console.log(sql);
    db.query(sql, (err, data) => {
      if (err) {
        res(new ErrObj(50500, 'Unknown error!'));
        throw err;
      }
      res(new ResObj('查询成功', data));
    });
  });
};

module.exports = getCourseList;
