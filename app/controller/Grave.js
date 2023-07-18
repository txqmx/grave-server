'use strict';

const BaseController = require('./BaseController');
const GraveValidate = require('../validate/GraveValidate');

class GraveController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'grave'; // 名称

    this.validate = new GraveValidate(this.ctx);
  }


}

module.exports = GraveController;
