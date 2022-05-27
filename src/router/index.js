const router = require('koa-router')();

const user = require('./user');
const noti = require('./noti');
const acti = require('./acti');
const commit = require('./commit');

router.use('/user', user.routes(), user.allowedMethods());
router.use('/noti', noti.routes(), noti.allowedMethods());
router.use('/acti', acti.routes(), acti.allowedMethods());
router.use('/commit', commit.routes(), commit.allowedMethods());

module.exports = router;
