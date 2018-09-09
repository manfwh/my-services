'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto')
const token = 'shfwh'
const wechat = require('co-wechat');

class weChatController extends Controller {
  async index() {
   
  }
}
// 因为 Egg 需要用类的形式来组织，而 wechat 是通过 middleware 方法来生成中间件
weChatController.prototype.wechat = wechat({
  token,
  appid: 'wx21d8e7672a056d28',
  encodingAESKey: 'QaPCJCEkazygiar2LQzUDBYTcGEMvzRbFR8kERR1BvD'
}).middleware(async (message, ctx) => {
  ctx.body = message
});
module.exports = weChatController;
