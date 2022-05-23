const Koa = require('koa2');
const router = require('koa-router')();
const cors = require('koa-cors');
const koaBody = require('koa-body');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const mkdirIfNoExist = require('./utils/mkdirIfNoExist');

const app = new Koa();
const port = 9000;
const jwtKey = 'some-secret-abcdxxxx';

class ErrObj {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

const getUser = (token) => {
  let user;
  try {
    user = jwt.verify(token, jwtKey);
  } catch (err) {
    // console.error(err);
    if (err.name === 'TokenExpiredError') return new ErrObj(50014, 'token过期');
    if (err.name === 'JsonWebTokenError') return new ErrObj(50008, '非法的token');
    return new ErrObj(50000, 'token未知错误');
  }
  if (typeof user.username === 'undefined' || typeof user.password === 'undefined') {
    return new ErrObj(50000, 'token未知错误');
  }
  return user;
};

mkdirIfNoExist('./upload');

// log request URL
app.use(async (ctx, next) => {
  const t = new Date();
  console.log(
    '\x1B[36m%s\x1B[0m',
    `[${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}]`,
    `${ctx.request.method} "${ctx.request.url}"...`
  );
  await next();
});

app.use(cors());
app.use(koaBody({ multipart: true }));

router.post('/user/login', async (ctx, next) => {
  const username = ctx.request.body.username || '54321',
    password = ctx.request.body.password || '12345';
  console.log(`login with name: ${username}, password: ${password}`);
  const token = jwt.sign({ username, password }, jwtKey, { expiresIn: '7d' });
  ctx.response.body = {
    code: 20000,
    message: '登陆成功',
    data: { token }
  };
});

router.get('/user/info', async (ctx, next) => {
  const token = ctx.request.header['x-token'];
  const user = getUser(token);
  if (user.constructor === ErrObj) {
    console.log(user);
    ctx.response.body = { ...user };
    return;
  }
  ctx.response.body = {
    code: 20000,
    message: '查询成功',
    data: {
      id: 12,
      username: 'admin',
      name: '李华',
      avatar: 'https://s2.loli.net/2022/05/11/JNFt98pAWqZlznw.jpg',
      admin: true
    }
  };
});

router.post('/commit/:id', async (ctx, next) => {
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
    const commitPath = path.join(__dirname, `upload/${id}`);
    mkdirIfNoExist(commitPath);
    const userPath = path.join(commitPath, user.username);
    mkdirIfNoExist(userPath);
    const destinPath = path.join(userPath, name);
    if (!fs.existsSync(commitPath)) {
      fs.mkdirSync(commitPath);
    }
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

// add router middleware:
app.use(router.routes());

app.listen(port, '0.0.0.0', () => {
  console.log('Server is running at http://localhost:' + port);
});
