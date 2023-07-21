'use strict';

const BaseService = require('./BaseService');

class GraveService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Grave'; // 模型名称
  }

  async createGrave(params) {
    const { ctx } = this;
    const _where = { code: params.code };
    const cur = await ctx[this.delegate][this.model].findOne({
      where: _where,
    });
    if (cur) {
      this.ctx.error('编码不能重复');
    }
    const transaction = await this.ctx[this.delegate].transaction();
    try {
      const grave = await ctx[this.delegate][this.model].create(params);
      const grave_id = grave.id;
      if (params.master) {
        const param = {
          grave_id,
          name: params.master.name,
          is_master: 1,
        };
        const master = await ctx[this.delegate].Member.create(param);
        grave.update({ master_id: master.id });
      }
      await transaction.commit();
      return grave;
    } catch (error) {
      transaction.rollback();
      this.ctx.throw(500, error.message || '服务器错误');
    }
  }


}

module.exports = GraveService;
