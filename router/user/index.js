/*
create table if not exists `user` (
  //////`student_id` int unsigned auto_increment,
  `sid` int unsigned,
  `username` varchar(20) not null,
  `password` varchar(20) not null,
  `name` varchar(10) not null,
  `avatar` text not null,
  `gender` varchar(10) not null,
  `birthday` date not null,
  `school` varchar(10) not null,
  `major` varchar(10) not null,
  `grade` smallint not null,
  `admin` tinyint not null default 0,
  primary key ( `sid` )
)default charset=utf8;
*/

// describe user;
// +----------+--------------+------+-----+---------+-------+
// | Field    | Type         | Null | Key | Default | Extra |
// +----------+--------------+------+-----+---------+-------+
// | sid      | int unsigned | NO   | PRI | NULL    |       |
// | username | varchar(20)  | NO   |     | NULL    |       |
// | password | varchar(20)  | NO   |     | NULL    |       |
// | name     | varchar(10)  | NO   |     | NULL    |       |
// | avatar   | text         | NO   |     | NULL    |       |
// | gender   | varchar(10)  | NO   |     | NULL    |       |
// | birthday | date         | NO   |     | NULL    |       |
// | school   | varchar(10)  | NO   |     | NULL    |       |
// | major    | varchar(10)  | NO   |     | NULL    |       |
// | grade    | smallint     | NO   |     | NULL    |       |
// | admin    | tinyint      | NO   |     | 0       |       |
// +----------+--------------+------+-----+---------+-------+

// insert into user values (19000000, 'admin', 'admin', '管理员', 'https://s2.loli.net/2022/05/11/JNFt98pAWqZlznw.jpg', '男', '1970-12-12', '智能工程学院', '交通工程', 2019, 1);
// (19101010, 'wangw5', 'SuperSecretPwd', '王五', 'https://s2.loli.net/2022/05/11/JNFt98pAWqZlznw.jpg', '女', '1970-04-06', '智能工程学院', '交通工程', 2019, 1);

const user = require('koa-router')();
const ErrObj = require('../../utils/ErrObj');
const getUser = require('../../utils/user/getUser');
const getUserInfo = require('../../utils/user/getUserInfo')
const verifyUser = require('../../utils/user/verifyUser');
const newUser = require('../../utils/user/newUser');
const modifyUser = require('../../utils/user/modifyUser');
const deleteUser = require('../../utils/user/deleteUser');

user.post('/login', async (ctx, next) => {
  const res = await verifyUser(ctx.request.body.username, ctx.request.body.password);
  console.log(res);
  ctx.response.body = res;
});

user.get('/info', async (ctx, next) => {
  const token = ctx.request.header['x-token'];
  const user = getUser(token);
  if (user.constructor === ErrObj) {
    console.log(user);
    ctx.response.body = { ...user };
    return;
  }
  const res = await getUserInfo(user.sid);
  ctx.response.body = res;
});

user.put('/', async (ctx, next) => {
  const token = ctx.request.header['x-token'];
  const user = getUser(token);
  if (user.constructor === ErrObj) {
    console.log(user);
    ctx.response.body = { ...user };
    return;
  }
  if (user.admin === false) {
    const errObj = new ErrObj(50005, '用户非管理员');
    ctx.response.body = errObj;
    return;
  }
  const newUserObj = ctx.request.body;
  const res = await newUser(newUserObj);
  ctx.response.body = res;
});

user.post('/', async (ctx, next) => {
  const token = ctx.request.header['x-token'];
  const user = getUser(token);
  if (user.constructor === ErrObj) {
    console.log(user);
    ctx.response.body = { ...user };
    return;
  }
  if (user.admin === false) {
    const errObj = new ErrObj(50005, '用户非管理员');
    ctx.response.body = errObj;
    return;
  }
  const modiUser = ctx.request.body;
  const res = await modifyUser(modiUser);
  ctx.response.body = res;
});

user.delete('/:id', async (ctx, next) => {
  const token = ctx.request.header['x-token'];
  const user = getUser(token);
  if (user.constructor === ErrObj) {
    console.log(user);
    ctx.response.body = { ...user };
    return;
  }
  if (user.admin === false) {
    const errObj = new ErrObj(50005, '用户非管理员');
    ctx.response.body = errObj;
    return;
  }
  const arr1 = ctx.request.url.split('/');
  const sid = arr1[arr1.length - 1].split('?')[0];
  const res = await deleteUser(sid);
  ctx.response.body = res;
});

module.exports = user;
