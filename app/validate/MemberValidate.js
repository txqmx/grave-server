'use strict';

const BaseValidate = require('./BaseValidate');

class ArticleValidate extends BaseValidate {
  constructor(ctx) {
    super(ctx);
    this.rule = {
      id: [{ required: true, message: 'id不能为空' }],
      name: [{ required: true, message: 'name不能为空' }],
      code: [{ required: true, message: 'code不能为空' }],
    };
    this.where = {
      in: [ 'id', 'code' ],
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
    this.setValidate([ 'name', 'code' ]);
    this.filterParam([ 'id' ]);
  }

  sceneEdit() {
    this.setValidate([ 'id', 'name', 'code' ]);
    this.filterParam([ 'code' ]);
  }


}

module.exports = ArticleValidate;
