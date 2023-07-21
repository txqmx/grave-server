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
      include: [{
        model: this.ctx.model.Mate,
        as: 'mateInfo',
      }],
    });
    result = await this.findChild(result, ctx);
    return result;
  }

  async findChild(list, ctx) {
    // const { ctx } = this;
    const include = [{
      model: ctx.model.Mate,
      as: 'mateInfo',
    }];
    const promise = [];
    list.forEach(item => {
      promise.push(ctx[this.delegate][this.model].findAll({
        where: {
          pid: item.id,
        },
        include,
      }));
    });
    const children = await Promise.all(promise);

    for (let [ index, item ] of children.entries()) {
      console.log('---', index, item);
      if (item.length > 0) {
        item = await this.findChild(item, ctx);
      }

      list[index].setDataValue('children', item);
    }
    return list;
  }

}

module.exports = MemberService;
