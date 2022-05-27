const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const getActiList = (sid) => {
  return new Promise((res, _) => {
    let sql = `select * from acti`;
    db.query(sql, async (err, data) => {
      if (err) {
        res(new ErrObj(50300, 'Unknown error!'));
        throw err;
      }
      data = await Promise.all(
        data.map(async (row) => {
          const checkLoginSql = `
          select * from acti_login
          where sid=${sid} and aid=${row.id}
        `;
          if (row.login == 0) return row;
          const logined = await new Promise((res2, _) => {
            db.query(checkLoginSql, (err2, data2) => {
              if (err2) {
                res2(new ErrObj(50300, 'Unknown error!'));
                throw err2;
              }
              if (data2.length === 0) res2(false);
              else res2(true);
            });
          });
          if (logined) {
            return {
              ...row,
              login: 2
            };
          } else {
            return row;
          }
        })
      );
      console.log(`return ${data.length} rows`);
      res(new ResObj('查询成功', data));
    });
  });
};

module.exports = getActiList;
