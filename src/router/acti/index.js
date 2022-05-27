const acti = require('koa-router')();
const ErrObj = require('../../utils/ErrObj');
const getUser = require('../../utils/user/getUser');
const checkAdmin = require('../../utils/user/checkAdmin');
const getActiList = require('../../utils/acti/getActiList');
const newActi = require('../../utils/acti/newActi');
const modifyActi = require('../../utils/acti/modifyActi');
const deleteActi = require('../../utils/acti/deleteActi');
const actiLogin = require('./login');

acti.get('/', async (ctx, next) => {
  const user = getUser(ctx.request.header['x-token']);
  if (user.constructor === ErrObj) {
    ctx.response.body = user;
    return;
  }
  const res = await getActiList(user.sid);
  ctx.response.body = res;
});

acti.put('/', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const newActiObj = ctx.request.body;
  const res = await newActi(newActiObj);
  ctx.response.body = res;
});

acti.post('/', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const modiActiObj = ctx.request.body;
  const res = await modifyActi(modiActiObj);
  ctx.response.body = res;
});

acti.delete('/:id', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const arr1 = ctx.request.url.split('/');
  const id = arr1[arr1.length - 1].split('?')[0];
  const res = await deleteActi(id);
  ctx.response.body = res;
});

acti.use('/login', actiLogin.routes(), actiLogin.allowedMethods());

module.exports = acti;
