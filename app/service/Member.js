'use strict';

const BaseService = require('./BaseService');

class MemberService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Member'; // 模型名称
  }

  async findTree(params) {
    const { ctx } = this;
    const where = {};
    if (params.id) {
      where.id = params.id;
    } else {
      where.pid = 0;
    }
    let result = await ctx[this.delegate][this.model].findAll({
      where,
      include: 'mate',
    });
    result = await this.findChild(result);
    return result;
  }

  async findChild(list = []) {
    const { ctx } = this;
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const res = await ctx[this.delegate][this.model].findAll({
        where: {
          pid: item.id,
        },
      });
      for (let j = 0; j < res.length; j++) {
        const child = res[j];
        const mate = await child.getMate();
        child.setDataValue('mate', mate);
      }
      const children = await this.findChild(res);
      list[i].setDataValue('children', children);
    }
    return list;
  }

}

module.exports = MemberService;
