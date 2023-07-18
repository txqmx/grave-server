'use strict';

const BaseService = require('./BaseService');

class PhotoService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Photo'; // 模型名称
  }
}

module.exports = PhotoService;
