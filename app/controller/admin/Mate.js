'use strict';

const BaseController = require('../BaseController');
const MateValidate = require('../../validate/MateValidate');

class MateController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'mate'; // service名称

    this.validate = new MateValidate(this.ctx);
  }
}

module.exports = MateController;
