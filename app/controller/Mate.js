'use strict';

const BaseController = require('./BaseController');
const MetaValidate = require('../validate/MetaValidate');

class MetaController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'meta'; // service名称

    this.validate = new MetaValidate(this.ctx);
  }
}

module.exports = MetaController;
