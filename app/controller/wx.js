'use strict';

const Controller = require('egg').Controller;


class AiController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hello wx!"
  }
}
module.exports = AiController;
