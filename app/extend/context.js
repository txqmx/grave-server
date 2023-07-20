'use strict';
module.exports = {

  // 成功返回
  success(data = null, code = 0, status = 200) {
    this.status = status;
    this.body = {
      code,
      message: 'success',
      data,
    };
  },

  // 返回失败
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
