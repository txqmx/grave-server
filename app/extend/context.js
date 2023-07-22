'use strict';
module.exports = {

  // 统一请求参数
  getParams(key) {
    const method = this.request.method;
    let params = {};
    if (method === 'GET') {
      params = this.request.query;
    } else if (method === 'POST') {
      params = this.request.body;
    }
    return key ? params[key] : params;
  },

  // 成功返回
  success(data = null, code = 0, status = 200) {
    this.status = status;
    this.body = {
      code,
      message: 'success',
      data,
    };
  },

  // 直接抛错，系统级错误 ctx.throw(401, 'xxx');
  // 手动指定错误，业务级错误 status=200，可指定特殊code，抛错是为了终止操作
  error(message = '', code = 1, status = 200) {
    this.status = status;
    this.body = {
      code,
      message,
    };
    const err = new Error();
    err.status = status;
    err.message = message;
    throw err;
  },
};
