'use strict';

class BaseValidate {
  constructor(ctx) {
    this.ctx = ctx;
    this.method = 'GET';
    this.defaultParams = {}; // 默认参数
    this.params = {}; // 请求参数
    this.allRule = {}; // 全部校验规则
    this.rule = {}; // 需校验规则
    this.isPage = false;
    this.where = {
      in: {},
      like: {},
    }; // 模糊搜索
    this.init();
  }

  init() {
    this.params = { ...this.defaultParams, ...this.ctx.getParams() };
  }

  // 设置场景
  setScene(type) {
    if (this[`scene${type}`]) {
      this[`scene${type}`]();
    }
    return this;
  }

  // 入参校验
  async checkValidate() {
    const validateResult = await this.ctx.validate(this.rule, this.params);
    if (!validateResult) {
      const error = this.ctx.body.error;
      this.ctx.throw(400, error.length ? error[0].message : '参数错误');
    }
    return this.getParams();
  }

  // 返回参数
  async getParams() {
    return this.params;
  }

  // 返回列表参数
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
    Object.entries(this.where.in).forEach(res => {
      const [ key, item ] = res;
      if (params[key]) {
        if (item.type === 'number') {
          params[key] = Number(params[key]);
        }
        where[key] = {
          $in: [ params[key] ],
        };
      }
    });
    Object.entries(this.where.like).forEach(res => {
      const [ key ] = res;
      if (params[key]) {
        where[key] = {
          $like: `%${params[key]}%`,
        };
      }
    });
    listParams.where = where;
    return listParams;
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
      if (this.allRule[item]) {
        obj[item] = this.allRule[item];
      }
    });
    this.rule = obj;
  }

  // 校验场景
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
