'use strict';

const BaseController = require('./BaseController');
const AdminValidate = require('../validate/AdminValidate');

class AdminController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'admin'; // 名称

    this.validate = new AdminValidate(this.ctx);
  }

  // 登录
  async login() {
    const { ctx } = this;
    const params = await this.validate.getParams('Login');
    const result = await ctx.service[this.service].login(params);
    this.ctx.success(result);
  }


}

module.exports = AdminController;
