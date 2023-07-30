'use strict';

const BaseController = require('../BaseController');
const MemberValidate = require('../../validate/MemberValidate');

class MemberController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'member'; // 名称

    this.validate = new MemberValidate(this.ctx);
  }

  // // 获取层级
  // async getLevel() {
  //   const { ctx } = this;
  //   const params = await this.validate.getParams();
  //   const result = await ctx.service.member.getLevel(params);
  //   this.ctx.success(result);
  // }

}

module.exports = MemberController;
