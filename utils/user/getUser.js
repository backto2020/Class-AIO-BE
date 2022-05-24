const jwt = require('jsonwebtoken');
const jwtKey = require('./jwtKey');

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

module.exports = getUser;
