'use strict';

const BaseValidate = require('./BaseValidate');

class FileValidate extends BaseValidate {
  constructor(ctx) {
    super(ctx);

    this.defaultParams = {
      // 从token中取id，默认携带
      admin_id: ctx.state.user && ctx.state.user.id,
      grave_id: ctx.state.grave && ctx.state.grave.id,
      folder: ctx.state.grave && ctx.state.grave.code, // 路径
    };

    this.allRule = {
      admin_id: [{ required: true, message: 'admin_id不能为空' }],
      grave_id: [{ required: true, message: 'grave_id不能为空' }],
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

  sceneUpload() {

  }

}

module.exports = FileValidate;
