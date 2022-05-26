const noti = require('koa-router')();
const ErrObj = require('../../utils/ErrObj');
const getUser = require('../../utils/user/getUser');
const getNotiList = require('../../utils/noti/getNotiList');

noti.get('/', async (ctx, next) => {
  const user = getUser(ctx.request.header['x-token']);
  if (user.constructor === ErrObj) {
    ctx.response.body = user;
    return;
  }
  const res = await getNotiList();
  ctx.response.body = res;
});

module.exports = noti;
