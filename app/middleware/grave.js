'use strict';

module.exports = (type = 'admin') => {
  return async (ctx, next) => {
    const grave_id = ctx.getParams('grave_id') || ctx.request.header.grave_id || null;
    const code = ctx.getParams('code') || ctx.request.header.code || null;
    const where = {};

    if (type === 'admin') {
      if (!grave_id) ctx.error('请选择一个墓碑', 2);
      where.id = grave_id;
    } else {
      if (!code) ctx.error('请选择一个墓碑', 2);
      where.code = code;
    }

    // 验证用户是否有效
    const grave = await ctx.model.Grave.findOne({
      where,
    });
    if (grave) {
      ctx.state.grave = grave;
      await next();
    } else {
      ctx.error('墓碑信息已失效或不存在', 2);
    }

  };
};
