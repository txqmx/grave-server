'use strict';

const Service = require('egg').Service;

class BseService extends Service {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model';
  }

  async findAll(params) {
    const { ctx } = this;
    const result = await ctx[this.delegate][this.model].findAll(params);
    return result;
  }

  async create(params) {
    const { ctx } = this;
    const result = await ctx[this.delegate][this.model].create(params);
    return result;
  }

  async findOne(id) {
    const { ctx } = this;
    const _where = { id };
    const result = await ctx[this.delegate][this.model].findOne({
      where: _where,
    });
    return result;
  }

  async update({ id, ...params }) {
    const result = await this.ctx[this.delegate][this.model].findByPk(id);
    if (!result) {
      this.ctx.error('不存在');
    }
    await result.update(params);
    return result;
  }

  async delete(id) {
    const result = await this.ctx[this.delegate][this.model].findByPk(id);
    if (!result) {
      this.ctx.error('不存在');
    }
    await result.destroy();
    return result;
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
    });
    result = await this.findChild(result);
    return result;
  }

  async findChild(list) {
    const { ctx } = this;
    const promise = [];
    list.forEach(item => {
      promise.push(ctx[this.delegate][this.model].findAll({
        where: {
          pid: item.id,
        },
      }));
    });
    const child = await Promise.all(promise);
    for (let [ index, item ] of child.entries()) {
      if (item.length > 0) {
        item = await this.findChild(item);
      }
      list[index].dataValues.child = item;
    }
    return list;
  }
}

module.exports = BseService;
