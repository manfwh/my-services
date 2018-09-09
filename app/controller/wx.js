'use strict';

const Controller = require('egg').Controller;


class AiController extends Controller {
  async index() {
    ctx.body = "hello wx!"
  }
}

module.exports = AiController;
