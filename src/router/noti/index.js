const noti = require('koa-router')();
const ErrObj = require('../../utils/ErrObj');
const getUser = require('../../utils/user/getUser');
const checkAdmin = require('../../utils/user/checkAdmin');
const getNotiList = require('../../utils/noti/getNotiList');
const newNoti = require('../../utils/noti/newNoti');
const modifyNoti = require('../../utils/noti/modifyNoti');
const deleteNoti = require('../../utils/noti/deleteNoti');

noti.get('/', async (ctx, next) => {
  const user = getUser(ctx.request.header['x-token']);
  if (user.constructor === ErrObj) {
    ctx.response.body = user;
    return;
  }
  const res = await getNotiList();
  ctx.response.body = res;
});

noti.post('/', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const newNotiObj = ctx.request.body;
  const res = await newNoti(newNotiObj);
  ctx.response.body = res;
});

noti.put('/', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const modiNotiObj = ctx.request.body;
  const res = await modifyNoti(modiNotiObj);
  ctx.response.body = res;
});

noti.delete('/:id', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const arr1 = ctx.request.url.split('/');
  const id = arr1[arr1.length - 1].split('?')[0];
  const res = await deleteNoti(id);
  ctx.response.body = res;
});

module.exports = noti;
