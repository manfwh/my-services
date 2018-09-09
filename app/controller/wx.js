'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto')
const token = 'shfwh'

class AiController extends Controller {
  async index() {
    const { ctx } = this;
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
    console.log(ctx.query)
    console.log(code)
    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (code === signature) {
      ctx.body = echostr
    } else {
      ctx.body = "hello wx!"
    }
    
  }
}
module.exports = AiController;
