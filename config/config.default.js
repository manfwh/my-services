'use strict';
const path = require('path')
module.exports = appInfo => {
  const config = exports = {};
  config.baseDir = 'http://192.168.43.238:7001'
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1528554203426_1927';
  config.ai = {
    appid: 1106897257,
    appkey: 'LsrIDmkJXDOPbMfV',
    url: {
      rlrh: 'https://api.ai.qq.com/fcgi-bin/ptu/ptu_facemerge',
      hcsb: 'https://api.ai.qq.com/fcgi-bin/vision/vision_imgidentify'
    }
    
  }
  // add your config here
  config.middleware = [];
  config.alinode = {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    appid: '44727',
    secret: 'd58419f64b2c5386a41b97a615c85506d596669a'
  }
  config.security = {
    csrf: {
      enable: false,
    }
  }
  config.cluster = {
    listen: {
      port: 7001,
      hostname: '192.168.43.238'

    }
  }
  config.upload = {
    path: path.join(__dirname, '../app/public/upload/'),
    url: '/public/upload/',
  };
  return config;
};
