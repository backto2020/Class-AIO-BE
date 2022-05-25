const commit = require('koa-router')();
const fs = require('fs');
const path = require('path');
const mkdirIfNoExist = require('../../utils/mkdirIfNoExist');
const getUser = require('../../utils/user/getUser');
const ErrObj = require('../../utils/ErrObj');

commit.post('/:id', async (ctx, next) => {
  const arr1 = ctx.request.url.split('/');
  const id = arr1[arr1.length - 1].split('?')[0];
  const token = ctx.request.header['x-token'];
  const user = getUser(token);
  if (user.constructor === ErrObj) {
    console.log(user);
    ctx.response.body = { ...user };
    return;
  }
  console.log(`commit id: ${id}, received...`);
  for (let name in ctx.request.files) {
    console.log('filename: ', name);
    const sourcePath = ctx.request.files[name].filepath;
    const commitPath = path.join(__dirname, `../../upload/${id}`);
    mkdirIfNoExist(commitPath);
    const userPath = path.join(commitPath, user.username);
    mkdirIfNoExist(userPath);
    const destinPath = path.join(userPath, name);
    // if (!fs.existsSync(commitPath)) {
    //   fs.mkdirSync(commitPath);
    // }
    fs.rename(sourcePath, destinPath, (err) => {
      if (err) console.error(err);
      fs.stat(destinPath, (err, stats) => {
        if (err) console.error(err);
        console.log('success');
        // console.log('stats: ' + JSON.stringify(stats));
      });
    });
    ctx.request.files[name];
  }
  ctx.response.body = {
    code: 20000,
    message: '上传成功',
    data: JSON.stringify(ctx.request.files)
  };
});

module.exports = commit;
