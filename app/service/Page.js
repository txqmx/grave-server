'use strict';

const BaseService = require('./BaseService');

class PageService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Page'; // 模型名称
  }

  async findAll(params) {
    const { ctx } = this;
    const result = await ctx[this.delegate][this.model].findAll(params);
    for (let i = 0; i < result.length; i++) {
      const item = result[i];

      const template = await await item.getPage_template();
      item.setDataValue('template_name', template && template.name);
    }
    return result;
  }

  // 起停用，一个租户只能有一个启用页面
  async changeStatus(params) {
    const result = await this.ctx[this.delegate][this.model].findAll({ grave_id: params.grave_id });
    for (let i = 0; i < result.length; i++) {
      const item = result[i];
      if (item.id === params.id) {
        item.update({ is_active: params.is_active });
      } else {
        if (params.is_active === 1) {
          item.update({ is_active: 0 });
        }

      }
    }
    return true;
  }

}

module.exports = PageService;
