'use strict';

const BaseValidate = require('./BaseValidate');

class PageValidate extends BaseValidate {
  constructor(ctx) {
    super(ctx);

    this.defaultParams = {
      // 从token中取id，默认携带
      grave_id: ctx.state.grave && ctx.state.grave.id,
    };

    this.allRule = {
      id: [{ required: true, message: 'id不能为空' }],
      grave_id: [{ required: true, message: 'grave_id不能为空' }],
      template_id: [{ required: true, message: 'template_id不能为空' }],
      name: [{ required: true, message: 'name不能为空' }],
      is_active: [{ required: true, message: 'is_active不能为空' }],
    };

    this.where = {
      in: {
        id: { type: 'number' },
        grave_id: { type: 'number' },
      },
      like: {
        name: { type: 'string' },
      },
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
    this.setValidate([ 'name', 'grave_id', 'template_id' ]);
    this.filterParam([ 'id' ]);
  }

  // 编辑
  sceneEdit() {
    this.setValidate([ 'id', 'name' ]);
    this.filterParam([ 'grave_id', 'template_id' ]);
  }

  // 状态改变
  sceneStatus() {
    this.setValidate([ 'id', 'grave_id', 'is_active' ]);
  }


}

module.exports = PageValidate;
