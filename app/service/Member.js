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
    const where = {
      grave_id: params.grave_id,
    };
    if (params.id) {
      where.id = params.id;
    } else {
      where.pid = 0;
    }
    let result = await ctx[this.delegate][this.model].findAll({
      where,
      include: 'mate',
    });
    result = await this.findChild(result, 1);
    return result;
  }

  async findChild(list = [], level) {
    const { ctx } = this;
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      item.setDataValue('level', level);
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
      const children = await this.findChild(res, level + 1);
      item.setDataValue('children', children);
    }
    return list;
  }

}

module.exports = MemberService;
