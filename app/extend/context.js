'use strict';
module.exports = {

  // 成功返回
  success(data = null, code = 1, status = 200) {
    this.status = status;
    this.body = {
      code,
      data,
    };
  },

  // 返回失败
  error(message = '', status = 500) {
    const err = new Error();
    err.status = status;
    err.message = message;
    throw err;
  },
};
