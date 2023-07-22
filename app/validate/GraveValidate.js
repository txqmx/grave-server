'use strict';

const BaseValidate = require('./BaseValidate');

class GraveValidate extends BaseValidate {
  constructor(ctx) {
    super(ctx);
    this.allRule = {
      id: [{ required: true, message: 'id不能为空' }],
      code: [{ required: true, message: 'code不能为空' }],
      name: [{ required: true, message: 'name不能为空' }],

    };
    this.where = {
      in: [ 'id' ],
      like: [ 'name' ],
    };

    this.init();
  }

  // 设置场景
  setScene(type) {
    if (this[`scene${type}`]) {
      this[`scene${type}`]();
    }
    return this;
  }


  sceneAdd() {
    this.setValidate([ 'code' ]);
    this.filterParam([ 'id' ]);
  }

  sceneEdit() {
    this.setValidate([ 'id' ]);
    this.filterParam([ 'code' ]);
  }


}

module.exports = GraveValidate;
