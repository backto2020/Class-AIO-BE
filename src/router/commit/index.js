const commit = require('koa-router')();
const fs = require('fs');
const path = require('path');
const mkdirIfNoExist = require('../../utils/mkdirIfNoExist');
const getUser = require('../../utils/user/getUser');
const checkAdmin = require('../../utils/user/checkAdmin');
const getCommitList = require('../../utils/commit/getCommitList');
const newCommit = require('../../utils/commit/newCommit');
const modifyCommit = require('../../utils/commit/modifyCommit');
const deleteCommit = require('../../utils/commit/deleteCommit');
const logCommit = require('../../utils/commit/logCommit');
const getCommitStatus = require('../../utils/commit/getCommitStatus');
const ErrObj = require('../../utils/ErrObj');
const ResObj = require('../../utils/ResObj');

commit.get('/', async (ctx, next) => {
  const user = getUser(ctx.request.header['x-token']);
  if (user.constructor === ErrObj) {
    ctx.response.body = user;
    return;
  }
  ctx.response.body = await getCommitList();
});

commit.put('/', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const newCommitObj = ctx.request.body;
  ctx.response.body = await newCommit(newCommitObj);
});

commit.post('/', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const modiCommitObj = ctx.request.body;
  ctx.response.body = await modifyCommit(modiCommitObj);
});

commit.delete('/:id', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const arr1 = ctx.request.url.split('/');
  const id = arr1[arr1.length - 1].split('?')[0];
  ctx.response.body = await deleteCommit(id);
});

commit.post('/:id', async (ctx, next) => {
  const user = getUser(ctx.request.header['x-token']);
  if (user.constructor === ErrObj) {
    ctx.response.body = user;
    return;
  }
  const arr1 = ctx.request.url.split('/');
  const id = arr1[arr1.length - 1].split('?')[0];
  console.log(`commit id: ${id}, received...`);
  const commitPath = path.join(__dirname, `../../../upload/${id}`);
  mkdirIfNoExist(commitPath);
  const userPath = path.join(commitPath, `${user.sid}-${user.name}`);
  mkdirIfNoExist(userPath);
  for (let name in ctx.request.files) {
    console.log('filename: ', name);
    const sourcePath = ctx.request.files[name].filepath;
    const destinPath = path.join(userPath, name);
    fs.rename(sourcePath, destinPath, (err) => {
      if (err) console.error(err);
      fs.stat(destinPath, (err, stats) => {
        if (err) console.error(err);
        console.log('success');
      });
    });
  }
  ctx.response.body = await logCommit(user.sid, id);
});

commit.get('/:id', async (ctx, next) => {
  const admin = await checkAdmin(ctx.request.header['x-token']);
  if (admin.constructor === ErrObj) {
    ctx.response.body = admin;
    return;
  }
  const arr1 = ctx.request.url.split('/');
  const id = arr1[arr1.length - 1].split('?')[0];
  ctx.response.body = await getCommitStatus(id);
});

module.exports = commit;
