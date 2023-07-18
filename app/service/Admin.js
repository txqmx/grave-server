'use strict';

const BaseService = require('./BaseService');

class AdminService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Admin'; // 模型名称
  }
}

module.exports = AdminService;
