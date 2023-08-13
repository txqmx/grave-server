'use strict';

const BaseController = require('../BaseController');
const HomeValidate = require('../../validate/HomeValidate');

class HomeController extends BaseController {
  constructor(...arg) {
    super(...arg);

    this.validate = new HomeValidate(this.ctx);
  }

  // 获取首页信息
  async getHomeInfo() {
    const { ctx } = this;
    const params = await this.validate.setScene('Detail').checkValidate();
    const result = await ctx.service.home.getHomeInfo(params);
    this.ctx.success(result);
  }

  // 获取墓碑信息
  async getGraveInfo() {
    const { ctx } = this;
    const params = await this.validate.setScene('Detail').checkValidate();
    const result = await ctx.service.home.getGraveInfo(params);
    this.ctx.success(result);
  }

  // 获取主人信息
  async getMasterInfo() {
    const { ctx } = this;
    const params = await this.validate.setScene('Detail').checkValidate();
    const result = await ctx.service.home.getMasterInfo(params);
    this.ctx.success(result);
  }


}

module.exports = HomeController;
