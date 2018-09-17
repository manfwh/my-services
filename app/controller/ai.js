'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('mz/fs');
// const toArray = require('stream-to-array');
var crypto = require('crypto')

class AiController extends Controller {
  async rlrh() {
    const { ctx, service, config } = this;
    const stream = await ctx.getFileStream();
    const options = {
      'app_id': config.ai.appid,
      'time_stamp': parseInt(Date.now() / 1000),
      'nonce_str': '20e3408a79',
      'model': stream.fields.model,
      'image': await ctx.service.image.base64(stream),
      'sign': ''
    }
    options.sign = await ctx.service.sign.getReqSign(options, config.ai.appkey);
    const res = await ctx.curl(config.ai.url.rlrh, {
      method: 'POST',
      data: options,
      dataType: 'json',
    });
    
    if (res.data.ret == 0) {
      const image = res.data.data.image;
      const filename = ctx.helper.md5(image) + path.extname(stream.filename).toLowerCase();
      const buf = Buffer.from(image, 'base64');
      const target =  path.join(config.upload.path, filename);
      await fs.writeFile(target, buf)
      ctx.body = {
        ret: 0,
        img: filename,
      };
    } else {
      ctx.body = {
        ret: res.data.ret
      }
    }

  }
  async hcsb() {
    const { ctx, service, config } = this;
    const stream = await ctx.getFileStream();
    const options = {
      'app_id': config.ai.appid,
      'time_stamp': parseInt(Date.now() / 1000),
      'nonce_str': '20e3408a79',
      'scene': 2,
      'image': await ctx.service.image.base64(stream),
      'sign': ''
    }
    options.sign = await ctx.service.sign.getReqSign(options, config.ai.appkey);
    const res = await ctx.curl(config.ai.url.hcsb, {
      method: 'POST',
      data: options,
      dataType: 'json',
    });
    if (res.data.ret == 0) {
      const data = res.data.data['tag_list'][0]
    
      ctx.body = {
        ret: 0,
        data
      };
    } else {
      ctx.body = {
        ret: res.data.ret
      }
    }
  }
  async ocr_idcardocr() {
    const { ctx, service, config } = this;
    const stream = await ctx.getFileStream();
    const options = {
      app_id: config.ai.appid,
      time_stamp:  parseInt(Date.now() / 1000),
      nonce_str: '20e3408a79',
      image: await ctx.service.image.base64(stream),
      card_type: ctx.request.body.card_type
    }
    options.sign = await ctx.service.sign.getReqSign(options, config.ai.appkey);
    const res = await ctx.curl(config.ai.url.idcardocr, {
      method: 'POST',
      data: options,
      dataType: 'json',
    });
    if (res.data.ret == 0) {
      const data = res.data.data;
      ctx.body = {
        ret: 0,
        data
      };
    } else {
      ctx.body = {
        ret: res.data.ret
      }
    }
  }
}

module.exports = AiController;
