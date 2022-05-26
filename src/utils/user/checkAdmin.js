const getUser = require('./getUser');
const getUserInfo = require('./getUserInfo');
const ErrObj = require('../ErrObj');

const checkAdmin = async (token) => {
  const user = getUser(token);
  if (user.constructor === ErrObj) {
    console.log(user);
    return user;
  }
  const userInfo = await getUserInfo(user.sid);
  if (userInfo.data.admin !== 1) {
    const err = new ErrObj(50005, '用户非管理员');
    console.log(err);
    return err;
  }
  return userInfo.data;
};

module.exports = checkAdmin;
