'use strict';

const BaseValidate = require('./BaseValidate');

class ArticleValidate extends BaseValidate {
  constructor(ctx) {
    super(ctx);
    this.rule = {
      id: [{ required: true, message: 'id不能为空' }],
      title: [{ required: true, message: 'title不能为空' }],
      type: [{ required: true, message: 'type不能为空' }],
    };
    this.where = {
      in: [ 'id', 'type' ],
      like: [ 'title' ],
    };
  }

  async getParams(type) {
    if (type && this[`scene${type}`]) {
      this[`scene${type}`]();
    }
    return await this.checkValidate();
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
