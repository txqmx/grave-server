'use strict';

const BaseController = require('./BaseController');
const AdminValidate = require('../validate/AdminValidate');

class AdminController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'admin'; // 名称

    this.validate = new AdminValidate(this.ctx);
  }


}

module.exports = AdminController;
