'use strict';

const BaseController = require('../BaseController');
const GraveValidate = require('../../validate/GraveValidate');

class GraveController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'grave'; // 名称

    this.validate = new GraveValidate(this.ctx);
  }

  // 新增 --- 新增墓碑+新增master
  async createGrave() {
    const { ctx } = this;
    const params = await this.validate.setScene('Add').checkValidate();
    const result = await ctx.service[this.service].createGrave(params);
    if (result) {
      this.ctx.success(result);
    } else {
      this.ctx.error('新增失败');
    }
  }


}

module.exports = GraveController;
