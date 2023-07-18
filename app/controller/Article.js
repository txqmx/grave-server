'use strict';

const BaseController = require('./BaseController');
const ArticleValidate = require('../validate/ArticleValidate');

class ArticleController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'article'; // 名称

    this.validate = new ArticleValidate(this.ctx);
  }


}

module.exports = ArticleController;
