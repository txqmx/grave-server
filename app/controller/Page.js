'use strict';

const BaseController = require('./BaseController');
const PageValidate = require('../validate/PageValidate');

class PageController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'page'; // 名称

    this.validate = new PageValidate(this.ctx);
  }


}

module.exports = PageController;
