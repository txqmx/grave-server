'use strict';

const BaseValidate = require('./BaseValidate');

class AdminValidate extends BaseValidate {
  constructor(ctx) {
    super(ctx);
    this.rule = {
      id: [{ required: true, message: 'id不能为空' }],
      name: [{ required: true, message: 'name不能为空' }],
      user_name: [{ required: true, message: 'user_name不能为空' }],
      password: [{ required: true, message: 'password不能为空' }],
      phone: [{ required: true, message: 'phone不能为空' }],
    };
    this.where = {
      in: [ 'id' ],
      like: [ 'name' ],
    };
  }

  async getParams(type) {
    if (this[`scene${type}`]) {
      this[`scene${type}`]();
    }
    return await this.checkValidate();
  }


  sceneAdd() {
    this.setValidate([ 'name', 'user_name', 'password' ]);
    this.filterParam([ 'id' ]);
  }

  sceneEdit() {
    this.setValidate([ 'id', 'name', 'user_name', 'password' ]);
  }


}

module.exports = AdminValidate;
