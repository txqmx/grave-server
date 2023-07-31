'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const user = ctx.state.user;

    if (user) {
      if (user.root === 1) {
        await next();
      } else {
        ctx.throw(403, '暂无权限');
      }
    } else {
      ctx.throw(401, '用户信息验证失败，请重新登录');
    }

  };
};
