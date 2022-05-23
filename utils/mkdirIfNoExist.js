const fs = require('fs');

const mkdirIfNoExist = (path) => {
  if (path.constructor != String) return -1;
  if (!fs.existsSync(path)) fs.mkdirSync(path);
};

module.exports = mkdirIfNoExist;
