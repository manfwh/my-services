'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1528554203426_1927';

  // add your config here
  config.middleware = [];
  config.alinode = {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    appid: '44727',
    secret: 'd58419f64b2c5386a41b97a615c85506d596669a'
  }
  return config;
};
