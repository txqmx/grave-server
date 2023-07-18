'use strict';

class BaseValidate {
  constructor(ctx) {
    this.ctx = ctx;
    this.method = 'GET';
    this.params = {};
    this.rule = {};
    this.filterRule = {};
    this.isPage = false;
    this.where = {};
    this.init();
  }

  init() {
    this.method = this.ctx.request.method;
    if (this.method === 'GET') {
      this.params = this.ctx.request.query;
    } else if (this.ctx.request.method === 'POST') {
      this.params = this.ctx.request.body;
    }
  }

  // 对象中排除某些属性
  filterParam(arr) {
    if (Array.isArray(arr)) {
      const obj = {};
      for (const i in this.params) {
        if (!arr.includes(i)) {
          obj[i] = this.params[i];
        }
      }
      this.params = obj;
    }
  }

  // 设置校验项
  setValidate(arr) {
    const obj = {};
    arr.forEach(item => {
      if (this.rule[item]) {
        obj[item] = this.rule[item];
      }
    });
    this.filterRule = obj;
  }

  // 入参校验
  async checkValidate() {
    const validateResult = await this.ctx.validate(this.filterRule, this.params);
    if (!validateResult) {
      const error = this.ctx.body.error;
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        status: 500,
        message: error.length ? error[0].message : '参数错误',
      });
    }
    return this.params;
  }

  async getParams(type) {
    if (type && this[`scene${type}`]) {
      this[`scene${type}`]();
    }
    return await this.checkValidate();
  }

  async getListParams() {
    const params = await this.getParams();
    let listParams = {};
    if (this.isPage) {
      listParams = Object.assign(listParams, {
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
      });
    }
    const where = {};
    this.where.in.forEach(item => {
      if (params[item]) {
        // 类型转换问题待处理
        if (item === 'id') {
          const ids = params.id.split(',').map(item => parseInt(item));
          where[item] = {
            $in: ids,
          };
        } else {
          where[item] = {
            $in: [ params[item] ],
          };
        }
      }
    });
    this.where.like.forEach(item => {
      if (params[item]) {
        where[item] = {
          $like: `%${params[item]}%`,
        };
      }
    });
    listParams.where = where;
    return listParams;
  }

  sceneAdd() {
    this.filterParam([ 'id' ]);
  }

  sceneEdit() {
    this.setValidate([ 'id' ]);
  }

  sceneDetail() {
    this.setValidate([ 'id' ]);
  }

  sceneDelete() {
    this.setValidate([ 'id' ]);
  }
}

module.exports = BaseValidate;
