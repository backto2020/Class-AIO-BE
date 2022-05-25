const db = require('../db');
const ErrObj = require('../../utils/ErrObj');

const getUserList = () => {
  return new Promise((res, _) => {
    let sql = `select * from user`;
    console.log(sql);
    db.query(sql, (err, data) => {
      if (err) {
        res(new ErrObj(50100, 'Unknown error!'));
        throw err;
      }
      res({
        code: 20000,
        message: '查询成功',
        data
      });
    });
  });
};

module.exports = getUserList;
