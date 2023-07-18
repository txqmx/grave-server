'use strict';

const BaseController = require('./BaseController');
const MemberValidate = require('../validate/MemberValidate');

class MemberController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'member'; // 名称

    this.validate = new MemberValidate(this.ctx);
  }


}

module.exports = MemberController;
