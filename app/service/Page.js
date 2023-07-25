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

}

module.exports = PageService;
