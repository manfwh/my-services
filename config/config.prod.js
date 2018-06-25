'use strict';
const path = require('path')
module.exports = appInfo => {
  const config = exports = {};
  config.baseDir = 'http://127.0.0.1:7001'

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '127.0.0.1'

    }
  }

  return config;
};