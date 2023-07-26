'use strict';


const Controller = require('egg').Controller;

class BaseController extends Controller {
  constructor(...arg) {
    super(...arg);
    this.service = '';
  }

  // 新增
  async create() {
    const { ctx } = this;
    const params = await this.validate.setScene('Add').checkValidate();
    const result = await ctx.service[this.service].create(params);
    this.ctx.success(result);
  }

  // 查询详情
  async findOne() {
    const { ctx } = this;
    const params = await this.validate.setScene('Detail').checkValidate();
    const result = await ctx.service[this.service].findOne(params.id);
    this.ctx.success(result);
  }

  // 编辑
  async update() {
    const { ctx } = this;
    const params = await this.validate.setScene('Edit').checkValidate();
    const result = await ctx.service[this.service].update(params);
    this.ctx.success(result);
  }

  // 删除
  async delete() {
    const { ctx } = this;
    const params = await this.validate.setScene('Delete').checkValidate();
    await ctx.service[this.service].delete(params.id);
    this.ctx.success('success');
  }

  // 查询列表
  async findAll() {
    const { ctx } = this;
    const params = await this.validate.getListParams();
    const result = await ctx.service[this.service].findAll(params);
    this.ctx.success(result);
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
