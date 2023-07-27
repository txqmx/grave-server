'use strict';

const BaseController = require('../BaseController');
const IndexValidate = require('../../validate/IndexValidate');

class IndexController extends BaseController {
  constructor(...arg) {
    super(...arg);

    this.validate = new IndexValidate(this.ctx);
  }

  // 获取首页信息
  async getHomeInfo() {
    const { ctx } = this;
    const params = await this.validate.setScene('Detail').checkValidate();
    const result = await ctx.service.index.getHomeInfo(params);
    this.ctx.success(result);
  }


}

module.exports = IndexController;
