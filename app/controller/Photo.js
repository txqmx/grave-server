'use strict';

const BaseController = require('./BaseController');
const PhotoValidate = require('../validate/PhotoValidate');

class PhotoController extends BaseController {
  constructor(...arg) {
    super(...arg);
    this.service = 'photo'; // 名称

    this.validate = new PhotoValidate(this.ctx);
  }


}

module.exports = PhotoController;
