/**
 * @param {Egg.Application} app - egg application
 */
const {errorMsg} = require('./errorMsg')
module.exports = app => {
  const { router, controller } = app;
  const error = app.middleware.errMsg({ errMsg: errorMsg });
  // 人脸融合
  router.get('/', controller.wx.page)
  router.post('/api/rlrh', error, controller.ai.rlrh);
  // 花草识别
  router.post('/api/hcsb', error, controller.ai.hcsb);
  // 身份证识别
  router.post('/api/ocr_idcardocr', error, controller.ai.ocr_idcardocr);
  router.get('/wx', controller.wx.index )
};
