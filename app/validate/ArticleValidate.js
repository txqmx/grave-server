'use strict';

const BaseValidate = require('./BaseValidate');

class ArticleValidate extends BaseValidate {
  constructor(ctx) {
    super(ctx);
    this.allRule = {
      id: [{ required: true, message: 'id不能为空' }],
      title: [{ required: true, message: 'title不能为空' }],
      type: [{ required: true, message: 'type不能为空' }],
    };
    this.where = {
      in: [ 'id', 'type' ],
      like: [ 'title' ],
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
    this.setValidate([ 'title' ]);
    this.filterParam([ 'id' ]);
  }

  sceneEdit() {
    this.setValidate([ 'id', 'title' ]);
    this.filterParam([ 'code' ]);
  }


}

module.exports = ArticleValidate;
