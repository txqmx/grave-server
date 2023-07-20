'use strict';

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      // ctx.app.emit('error', err, ctx);
      const status = err.status || 500;
      if (status !== 200) {
        ctx.body = {
          code: 1,
          message: err.message,
        };
        ctx.status = status;
      }

    }
  };
};
