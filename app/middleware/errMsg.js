module.exports = options => {
  return async (ctx, next) =>{
    await next();
    let body = ctx.body;
    if (body.ret == 0) return
    var error = options.errMsg.find(({code}) => code == body.ret);
    if (error != undefined) {
      ctx.body.msg = error.msg
    }
  }
}