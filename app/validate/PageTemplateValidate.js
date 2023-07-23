'use strict';

const BaseValidate = require('./BaseValidate');

class PageTemplateValidate extends BaseValidate {
  constructor(ctx) {
    super(ctx);

    this.defaultParams = {
      // 从token中取id，默认携带
      // id: ctx.state.user && ctx.state.user.id,
    };

    this.allRule = {
      id: [{ required: true, message: 'id不能为空' }],
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

  // 新增
  sceneAdd() {
    this.setValidate([ 'name' ]);
    this.filterParam([ 'id' ]);
  }

  // 编辑
  sceneEdit() {
    this.setValidate([ 'id', 'name' ]);
  }


}

module.exports = PageTemplateValidate;
