const router = require('koa-router')();

const user = require('./user');
const noti = require('./noti');
const commit = require('./commit');

router.use('/user', user.routes(), user.allowedMethods());
router.use('/noti', noti.routes(), noti.allowedMethods());
router.use('/commit', commit.routes(), commit.allowedMethods());

module.exports = router;
