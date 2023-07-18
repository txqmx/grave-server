'use strict';


const Controller = require('egg').Controller;

class BaseController extends Controller {
  constructor(...arg) {
    super(...arg);
    this.service = '';
  }

  // 查询列表
  async findAll() {
    const { ctx } = this;
    const params = await this.validate.getListParams();
    const result = await ctx.service[this.service].findAll(params);
    this.ctx.success(result);
  }

  // 新增
  async create() {
    const { ctx } = this;
    const params = await this.validate.getParams('Add');
    const result = await ctx.service[this.service].create(params);
    if (result) {
      this.ctx.success(result);
    } else {
      this.ctx.error('新增失败');
    }
  }

  // 查询详情
  async findOne() {
    const { ctx } = this;
    const params = await this.validate.getParams('Detail');
    const result = await ctx.service[this.service].findOne(params.id);
    if (result) {
      this.ctx.success(result);
    } else {
      this.ctx.success(null);
    }
  }

  // 编辑
  async update() {
    const { ctx } = this;
    const params = await this.validate.getParams('Edit');
    const result = await ctx.service[this.service].update(params);
    this.ctx.success(result);
  }

  // 删除
  async delete() {
    const { ctx } = this;
    const params = await this.validate.getParams('Delete');
    await ctx.service[this.service].delete(params.id);
    this.ctx.success('success');
  }

  // 查询树列表
  async treeList() {
    const { ctx } = this;
    const params = await this.validate.getParams();
    const result = await ctx.service[this.service].findTree(params);
    this.ctx.success(result);
  }
}

module.exports = BaseController;
