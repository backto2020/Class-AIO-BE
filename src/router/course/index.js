const course = require('koa-router')();
const ErrObj = require('../../utils/ErrObj');
const getUser = require('../../utils/user/getUser');
const getCourseList = require('../../utils/course/getCourseList');
const selectCourses = require('../../utils/course/selectCourses');

course.get('/all', async (ctx, next) => {
  const user = getUser(ctx.request.header['x-token']);
  if (user.constructor === ErrObj) {
    ctx.response.body = user;
    return;
  }
  ctx.response.body = await getCourseList();
});

course.put('/', async (ctx, next) => {
  const user = getUser(ctx.request.header['x-token']);
  if (user.constructor === ErrObj) {
    ctx.response.body = user;
    return;
  }
  ctx.response.body = await selectCourses(user.sid, ctx.request.body.select);
});

module.exports = course;
