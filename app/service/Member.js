'use strict';

const BaseService = require('./BaseService');

class MemberService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Member'; // 模型名称
  }

}

module.exports = MemberService;
