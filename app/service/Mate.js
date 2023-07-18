'use strict';

const BaseService = require('./BaseService');

class MateService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Mate'; // 模型名称
  }

}

module.exports = MateService;
