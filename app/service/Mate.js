'use strict';

const BaseService = require('./BaseService');

class MateService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Mate'; // 模型名称
  }

  async create(params) {
    const { ctx } = this;
    const _where = { id: params.mate_id };
    const master = await ctx[this.delegate].Member.findOne({
      where: _where,
    });
    if (!master) {
      this.ctx.error('保存错误');
    }
    const transaction = await this.ctx[this.delegate].transaction();
    try {
      const mate = await ctx[this.delegate][this.model].create(params);
      await master.update({ mate_id: mate.id });
      await transaction.commit();
      return mate;
    } catch (error) {
      transaction.rollback();
      this.ctx.throw(500, error.message || '服务器错误');
    }
  }

}

module.exports = MateService;
