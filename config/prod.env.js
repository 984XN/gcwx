'use strict';
const packageInfo = require('../package.json');

module.exports = {
  NODE_ENV: '"production"',
  FILE_SERVER: '"http://www.gczhdj.gov.cn/"',
  APP_UPDATE: JSON.stringify(new Date().toLocaleString()),
  APP_NAME: JSON.stringify(packageInfo.description),
  APP_VERSION: JSON.stringify(packageInfo.version),
  APP_AUTHOR: JSON.stringify(packageInfo.author.replace(/\s+<.*?>/, ''))
};
