const db = require('../db');
const ErrObj = require('../ErrObj');
const ResObj = require('../ResObj');
const getCourseList = require('./getCourseList');

const selectCourse = (sid, selectedCourses) => {
  return new Promise(async (res, _) => {
    if (selectedCourses.constructor !== Array) {
      res(new ErrObj(50510, 'Invalid courseList'));
      return;
    }
    let dataError = false;
    const selectedCourseIdList = selectedCourses.map((course) => {
      const id = parseInt(course);
      if (isNaN(id)) dataError = true;
      return id;
    });
    if (dataError) {
      res(new ErrObj(50511, 'Invalid data'));
      return;
    }
    const allCourses = await getCourseList();
    if (allCourses.constructor == ErrObj) {
      console.log(allCourses);
      res(allCourses);
      return;
    }
    const allCourseIdList = allCourses.data.map((course) => course.id);
    const courseNotExist = selectedCourseIdList.reduce(
      (notExist, cid) => notExist || allCourseIdList.indexOf(cid) === -1,
      false
    );
    if (courseNotExist) {
      res(new ErrObj(50512, 'Course not exist'));
      return;
    }
    const deleteRes = await new Promise((res2, _) => {
      const deleteSql = `delete from course_select where sid=${sid}`;
      db.query(deleteSql, (err, data) => {
        if (err) {
          const errObj = new ErrObj(50513, 'Unknown error!');
          console.log(errObj);
          res2(errObj);
          throw err;
        }
        res2(new ResObj('删除成功'));
      });
    });
    if (deleteRes.constructor === ErrObj) {
      res(deleteRes);
      return;
    }
    if(selectedCourseIdList.length === 0) {
      res(new ResObj('选课成功'));
      return;
    }
    const insertRes = await new Promise((res2, _) => {
      const insertSql = `insert into course_select (sid, cid) values ${selectedCourseIdList
        .map((course) => `(${sid}, ${course})`)
        .join(',')}`;
      db.query(insertSql, (err, data) => {
        if (err) {
          const errObj = new ErrObj(50514, 'Unknown error!');
          console.log(errObj);
          res2(errObj);
          throw err;
        }
        res2(new ResObj('选课成功'));
      });
    });
    res(insertRes);
  });
};

module.exports = selectCourse;
