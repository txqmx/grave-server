'use strict';

const BaseValidate = require('./BaseValidate');

class IndexValidate extends BaseValidate {
  constructor(ctx) {
    super(ctx);

    this.allRule = {
      code: [{ required: true, message: 'code不能为空' }],
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

  sceneDetail() {
    this.setValidate([ 'code' ]);
  }


}

module.exports = IndexValidate;
