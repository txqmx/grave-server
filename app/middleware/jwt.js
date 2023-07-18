'use strict';

module.exports = () => {
  return async (ctx, next) => {
    // const token = ctx.request.header.authorization;
    const token = ctx.request.header.token;
    if (token) {
      try {
        // 解密token
        const secret = ctx.app.config.jwt.secret;
        const decoded = await ctx.app.jwt.verify(token, secret);
        ctx.adminInfo = decoded;
        await next();
      } catch (err) {
        ctx.error(err, 401);
      }

    } else {
      ctx.error('请登录', 401);
    }

  };
};
