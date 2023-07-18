'use strict';

const BaseService = require('./BaseService');

class MediaService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Media'; // 模型名称
  }
}

module.exports = MediaService;
