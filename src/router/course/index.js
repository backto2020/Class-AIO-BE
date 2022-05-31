const course = require('koa-router')();
const ErrObj = require('../../utils/ErrObj');
const getUser = require('../../utils/user/getUser');
const getCourseList = require('../../utils/course/getCourseList');

course.get('/all', async (ctx, next) => {
  const user = getUser(ctx.request.header['x-token']);
  if (user.constructor === ErrObj) {
    ctx.response.body = user;
    return;
  }
  const res = await getCourseList();
  ctx.response.body = res;
});

module.exports = course;
