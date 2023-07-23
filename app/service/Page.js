'use strict';

const BaseService = require('./BaseService');

class PageService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Page'; // 模型名称
  }

}

module.exports = PageService;
