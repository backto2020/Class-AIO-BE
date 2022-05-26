const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const getUserInfo = (sid) => {
  console.log('Get user info: ', sid);
  return new Promise(async (res, rej) => {
    if (typeof sid === 'undefined') {
      res(new ErrObj(40115, '未指定学号'));
      return;
    }
    const getInfoSql = `select * from user where sid=${sid}`;
    db.query(getInfoSql, (err, data) => {
      if (err) throw err;
      if (data.length === 0) res(new ErrObj(40122, '不存在该学号的记录'));
      else res(new ResObj('查询成功', data[0]));
    });
  });
};

module.exports = getUserInfo;
