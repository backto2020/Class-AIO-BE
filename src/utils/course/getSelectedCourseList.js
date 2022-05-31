const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');

const getSelectedCourseList = (sid) => {
  return new Promise(async (res, _) => {
    const selectedCourses = await new Promise((res2, _) => {
      const getSelectedCidListsql = `select * from course_select where sid=${sid}`;
      db.query(getSelectedCidListsql, (err, data) => {
        if (err) {
          const errObj = new ErrObj(50500, 'Unknown error!');
          console.log(errObj);
          res2(errObj);
          throw err;
        }
        res2(data);
      });
    });
    if (selectedCourses.constructor === ErrObj) {
      res(selectedCourses);
      return;
    }
    if(selectedCourses.length === 0) {
      res(new ResObj('查询成功', []));
      return;
    }
    const selectedCourseIdList = selectedCourses.map((course) => course.cid);
    const userCourseList = await new Promise((res2, _) => {
      const getUserCourseListsql = `
        select * from course where id in (${selectedCourseIdList.join(',')})`;
      db.query(getUserCourseListsql, (err, data) => {
        if (err) {
          const errObj = new ErrObj(50500, 'Unknown error!');
          console.log(errObj);
          res2(errObj);
          throw err;
        }
        res2(new ResObj('查询成功', data));
      });
    });
    res(userCourseList);
  });
};

module.exports = getSelectedCourseList;
