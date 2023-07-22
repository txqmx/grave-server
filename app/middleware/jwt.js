'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const token = ctx.request.header.token || null;

    // token不存在
    if (!token) ctx.throw(401, '未登录，请先登录');

    // 验证token
    let decode = '';
    try {
      const secret = ctx.app.config.jwt.secret;
      decode = await ctx.app.jwt.verify(token, secret);
    } catch (error) {
      ctx.throw(401, '登录失效，请重新登录');
      console.log(error);
    }

    // 验证用户是否有效
    const user = await ctx.model.Admin.findOne({
      where: {
        id: decode.id,
      },
    });
    if (user && user.password === decode.password) {
      ctx.state.user = user;
      await next();
    } else {
      ctx.throw(401, '用户信息验证失败，请重新登录');
    }
  };
};
