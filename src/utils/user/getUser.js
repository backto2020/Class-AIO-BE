const jwt = require('jsonwebtoken');
const jwtKey = require('./jwtKey');
const ErrObj = require('../../utils/ErrObj');

const getUser = (token) => {
  let user;
  try {
    user = jwt.verify(token, jwtKey);
  } catch (err) {
    if (err.name === 'TokenExpiredError') user = new ErrObj(50014, 'token过期');
    else if (err.name === 'JsonWebTokenError') user = new ErrObj(50008, '非法的token');
    else user = new ErrObj(50000, 'token未知错误');
    console.error(user);
    return user;
  }
  if (
    typeof user.sid === 'undefined' ||
    typeof user.username === 'undefined' ||
    typeof user.password === 'undefined'
  ) {
    user = new ErrObj(50000, 'token未知错误');
    console.error(user);
    return user;
  }
  return user;
};

module.exports = getUser;
