'use strict';
module.exports = () => {
  return async (ctx, next) => {
    const flag = ctx.app.router.stack.filter(item => {
      return item.regexp.test(ctx.request.url.split('?')[0]) && item.methods.includes(ctx.request.method);
    });

    if (flag.length) {
      await next();
    } else {
      const msg = '接口 ' + ctx.request.url + ' 不存在';
      ctx.throw(404, msg);
    }
  };
};
