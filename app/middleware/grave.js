'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const grave_id = ctx.getParams('grave_id') || ctx.request.header.grave_id || null;

    if (!grave_id) ctx.error('请选择一个墓碑', 2);

    // 验证用户是否有效
    const grave = await ctx.model.Grave.findOne({
      where: {
        id: grave_id,
      },
    });
    if (grave) {
      ctx.state.grave = grave;
      await next();
    } else {
      ctx.error('墓碑信息已失效', 2);
    }

  };
};
