'use strict';

const BaseController = require('./BaseController');
const PageTemplateValidate = require('../validate/PageTemplateValidate');

class PageTemplateController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'pageTemplate'; // 名称

    this.validate = new PageTemplateValidate(this.ctx);
  }


}

module.exports = PageTemplateController;
