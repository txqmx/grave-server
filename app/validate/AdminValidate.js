'use strict';

const BaseValidate = require('./BaseValidate');

class AdminValidate extends BaseValidate {
  constructor(ctx) {
    super(ctx);

    this.defaultParams = {
      // 从token中取id，默认携带
      id: ctx.state.user && ctx.state.user.id,
    };

    this.allRule = {
      id: [{ required: true, message: 'id不能为空' }],
      name: [{ required: true, message: 'name不能为空' }],
      code: [{ required: true, message: 'code不能为空' }],
      user_name: [{ required: true, message: 'user_name不能为空' }],
      password: [{ required: true, message: 'password不能为空' }],
    };

    this.where = {
      in: {
        // id: { type: 'number' },
        user_name: { type: 'string' },
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

  // 新增
  sceneAdd() {
    this.setValidate([ 'name', 'code', 'user_name', 'password' ]);
    this.filterParam([ 'id' ]);
  }

  // 编辑
  sceneEdit() {
    this.setValidate([ 'id', 'user_name', 'password' ]);
    this.filterParam([ 'root', 'code' ]);
  }

  // 登录
  sceneLogin() {
    this.setValidate([ 'user_name', 'password' ]);
  }


}

module.exports = AdminValidate;
