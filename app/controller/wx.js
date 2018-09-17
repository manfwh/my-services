'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto')
const wechat = require('co-wechat');
const token = 'shfwh'
class weChatController extends Controller {
  async page() {
    this.ctx.body = 'page'
  }
  async index() {
    var {ctx} = this;
    var signature = ctx.query.signature;
    var timestamp = ctx.query.timestamp;
    var nonce = ctx.query.nonce;
    var echostr = ctx.query.echostr;
    var array = new Array(token, timestamp, nonce);
    array.sort();
    var str = array.toString().replace(/,/g, "");
     //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str, 'utf-8').digest("hex");
    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (code === signature) {
      ctx.body = echostr
    } else {
      ctx.body = "hello wx!"
    }
  }
}

// 因为 Egg 需要用类的形式来组织，而 wechat 是通过 middleware 方法来生成中间件
weChatController.prototype.wechat = wechat({
  token,
  appid: 'wx21d8e7672a056d28',
  encodingAESKey: 'QaPCJCEkazygiar2LQzUDBYTcGEMvzRbFR8kERR1BvD'
}).middleware(async (message, ctx) => {
  return 'Hello world!';
});
module.exports = weChatController;
