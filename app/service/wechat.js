const Service = require('egg').Service;
const crypto = require('crypto');

class wechatService extends Service {
  async getAccessToken() {
    const ctx = this.ctx;
    return await ctx.curl('https://api.weixin.qq.com/cgi-bin/token', {
      data: {
        grant_type: 'client_credential',
        appid: this.config.wechat.addid,
        secret: this.config.wechat.secret
      }
    });
  }
}
module.exports = wechatService;