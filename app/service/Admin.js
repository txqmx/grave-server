'use strict';

const BaseService = require('./BaseService');

class AdminService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Admin'; // 模型名称
  }

  async create(params) {
    const { ctx } = this;
    let cur = await ctx[this.delegate][this.model].findOne({
      where: { user_name: params.user_name },
    });
    if (cur) {
      this.ctx.error('用户名已存在');
    }
    cur = await ctx[this.delegate][this.model].findOne({
      where: { code: params.code },
    });
    if (cur) {
      this.ctx.error('编码不能重复');
    }
    const result = await ctx[this.delegate][this.model].create(params);
    return result;
  }

  async login(params) {
    const { ctx, app } = this;
    const _where = { user_name: params.user_name };
    const cur = await ctx[this.delegate][this.model].findOne({
      where: _where,
    });
    if (cur) {
      if (cur.password === params.password) {
        const token = app.jwt.sign({
          id: cur.id,
          root: cur.root,
          name: cur.name,
          password: cur.password,
        }, app.config.jwt.secret);
        return { token };
      }

      this.ctx.error('密码错误');

    } else {
      this.ctx.error('用户不存在');
    }
  }
}

module.exports = AdminService;
