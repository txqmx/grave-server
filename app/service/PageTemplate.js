'use strict';

const BaseService = require('./BaseService');

class PageTemplateService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'PageTemplate'; // 模型名称
  }

}

module.exports = PageTemplateService;
