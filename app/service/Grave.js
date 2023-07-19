'use strict';

const BaseService = require('./BaseService');

class GraveService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Grave'; // 模型名称
  }

  async create(params) {
    const { ctx } = this;
    const _where = { code: params.code };
    const cur = await ctx[this.delegate][this.model].findOne({
      where: _where,
    });
    if (cur) {
      this.ctx.error('编码不能重复');
    }
    const result = await ctx[this.delegate][this.model].create(params);
    return result;
  }


}

module.exports = GraveService;
