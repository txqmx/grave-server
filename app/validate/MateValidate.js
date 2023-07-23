'use strict';

const BaseValidate = require('./BaseValidate');

class ArticleValidate extends BaseValidate {
  constructor(ctx) {
    super(ctx);
    this.allRule = {
      id: [{ required: true, message: 'id不能为空' }],
      grave_id: [{ required: true, message: 'grave_id不能为空' }],
      mate_id: [{ required: true, message: 'mate_id不能为空' }],
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
    this.setValidate([ 'name', 'grave_id', 'mate_id' ]);
    this.filterParam([ 'id' ]);
  }

  sceneEdit() {
    this.setValidate([ 'id', 'name', 'mate_id' ]);
    this.filterParam([ 'grave_id', 'mate_id' ]);
  }


}

module.exports = ArticleValidate;
