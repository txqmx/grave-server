'use strict';

const BaseController = require('./BaseController');
const MediaValidate = require('../validate/MediaValidate');

class MediaController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'media'; // 名称

    this.validate = new MediaValidate(this.ctx);
  }


}

module.exports = MediaController;
