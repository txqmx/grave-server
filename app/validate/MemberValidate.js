'use strict';

const BaseValidate = require('./BaseValidate');

class ArticleValidate extends BaseValidate {
  constructor(ctx) {
    super(ctx);

    this.defaultParams = {
      // 从token中取id，默认携带
      admin_id: ctx.state.user && ctx.state.user.id,
      grave_id: ctx.state.grave && ctx.state.grave.id,
    };

    this.allRule = {
      id: [{ required: true, message: 'id不能为空' }],
      grave_id: [{ required: true, message: 'grave_id不能为空' }],
      name: [{ required: true, message: 'name不能为空' }],
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


  sceneAdd() {
    this.setValidate([ 'name', 'grave_id' ]);
    this.filterParam([ 'id' ]);
  }

  sceneEdit() {
    this.setValidate([ 'id', 'name' ]);
    this.filterParam([ 'grave_id' ]);
  }


}

module.exports = ArticleValidate;
