'use strict';

const BaseController = require('../BaseController');
const PageValidate = require('../../validate/PageValidate');

class PageController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'page'; // 名称

    this.validate = new PageValidate(this.ctx);
  }

  // 查询详情
  async changeStatus() {
    const { ctx } = this;
    const params = await this.validate.setScene('Status').checkValidate();
    const result = await ctx.service[this.service].changeStatus(params);
    this.ctx.success(result);
  }


}

module.exports = PageController;
