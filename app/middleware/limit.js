'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const user = ctx.state.user;

    if (user) {
      const grave = await user.getGraves();

      const total = grave.length;
      if (total < user.grave_limit) {
        await next();
      } else {
        ctx.error('创建墓碑数量已到上限');
      }
    } else {
      ctx.throw(401, '用户信息验证失败，请重新登录');
    }

  };
};
