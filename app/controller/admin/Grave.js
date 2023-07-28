'use strict';

const BaseController = require('../BaseController');
const GraveValidate = require('../../validate/GraveValidate');

class GraveController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'grave'; // 名称

    this.validate = new GraveValidate(this.ctx);
  }

  //  新增grave+新增master+新增page
  async createGrave() {
    const { ctx } = this;
    const params = await this.validate.setScene('Add').checkValidate();
    const result = await ctx.service[this.service].createGrave(params);
    this.ctx.success(result);
  }

  async getQrcode() {
    const { ctx } = this;
    const params = await this.validate.setScene('Detail').checkValidate();
    const result = await ctx.service[this.service].getQrcode(params);
    this.ctx.success(result);
  }


}

module.exports = GraveController;
