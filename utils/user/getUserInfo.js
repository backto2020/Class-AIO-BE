const db = require('../db');
const ErrObj = require('../../utils/ErrObj');

const getUserInfo = (sid) => {
  console.log('Get user info: ', sid);
  return new Promise(async (res, rej) => {
    if (typeof sid === 'undefined') {
      res(new ErrObj(40115, '未指定学号'));
    }
    const getInfoSql = `select * from user where sid=${sid}`;
    db.query(getInfoSql, (err, data) => {
      if (err) throw err;
      if (data.length === 0) res(new ErrObj(40122, '不存在该学号的记录'));
      else
        res({
          code: 20000,
          message: '查询成功',
          data: data[0]
        });
    });
  });
};

module.exports = getUserInfo;
