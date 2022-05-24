const router = require('koa-router')();

const user = require('./user');
const commit = require('./commit');

router.use('/user', user.routes(), user.allowedMethods());
router.use('/commit', commit.routes(), commit.allowedMethods());

module.exports = router;
