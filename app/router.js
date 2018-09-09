/**
 * @param {Egg.Application} app - egg application
 */
const {errorMsg} = require('./errorMsg')
module.exports = app => {
  const { router, controller } = app;
  const error = app.middleware.errMsg({ errMsg: errorMsg });
  // 人脸融合
  router.post('/api/rlrh', error, controller.ai.rlrh);
  // 花草识别
  router.post('/api/hcsb', error, controller.ai.hcsb);
  router.get('/wx', controller.wx.index )
};
