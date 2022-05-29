const Koa = require('koa2');
const cors = require('koa-cors');
const koaBody = require('koa-body');
const router = require('./router');
const static_ = require('koa-static');

const mkdirIfNoExist = require('./utils/mkdirIfNoExist');
mkdirIfNoExist('./upload');

const app = new Koa();
const port = 9000;

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

app.use(static_('./static'));

// add router middleware:
app.use(router.routes(), router.allowedMethods());

app.listen(port, '0.0.0.0', () => {
  console.log('Server is running at http://localhost:' + port);
});
