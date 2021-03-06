const user = require('koa-router')();
const ErrObj = require('../../utils/ErrObj');
const getUser = require('../../utils/user/getUser');
const getUserInfo = require('../../utils/user/getUserInfo');
const verifyUser = require('../../utils/user/verifyUser');
const newUser = require('../../utils/user/newUser');
const modifyUser = require('../../utils/user/modifyUser');
const deleteUser = require('../../utils/user/deleteUser');
const getUserList = require('../../utils/user/getUserList');
const checkAdmin = require('../../utils/user/checkAdmin');

user.post('/login', async (ctx, next) => {
  const res = await verifyUser(ctx.request.body.username, ctx.request.body.password);
  console.log(res);
  ctx.response.body = res;
});

user.get('/info', async (ctx, next) => {
  const user = getUser(ctx.request.header['x-token']);
  if (user.constructor === ErrObj) {
    ctx.response.body = user;
    return;
  }
  const res = await getUserInfo(user.sid);
  ctx.response.body = res;
});

user.get('/list', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const res = await getUserList();
  ctx.response.body = res;
});

user.post('/', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const newUserObj = ctx.request.body;
  const res = await newUser(newUserObj);
  ctx.response.body = res;
});

user.put('/', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const modiUser = ctx.request.body;
  const res = await modifyUser(modiUser);
  ctx.response.body = res;
});

user.delete('/:id', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const arr1 = ctx.request.url.split('/');
  const sid = arr1[arr1.length - 1].split('?')[0];
  console.log(sid, admin);
  if (sid == admin.sid) {
    ctx.response.body = new ErrObj(40123, '??????????????????');
    return;
  }
  const res = await deleteUser(sid);
  ctx.response.body = res;
});

module.exports = user;
