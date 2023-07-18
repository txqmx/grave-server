'use strict';

const BaseService = require('./BaseService');

class GraveService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Grave'; // 模型名称
  }


}

module.exports = GraveService;
