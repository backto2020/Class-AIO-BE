const actiLogin = require('koa-router')();
const ErrObj = require('../../utils/ErrObj');
const getUser = require('../../utils/user/getUser');
const loginActi = require('../../utils/acti/login/loginActi');

actiLogin.put('/:id', async (ctx, next) => {
  const user = getUser(ctx.request.header['x-token']);
  if (user.constructor === ErrObj) {
    ctx.response.body = user;
    return;
  }
  const arr1 = ctx.request.url.split('/');
  const id = arr1[arr1.length - 1].split('?')[0];
  const res = await loginActi(user.sid, id);
  ctx.response.body = res;
});

module.exports = actiLogin;
