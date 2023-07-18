'use strict';

const BaseService = require('./BaseService');

class ArticleService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Article'; // 模型名称
  }
}

module.exports = ArticleService;
