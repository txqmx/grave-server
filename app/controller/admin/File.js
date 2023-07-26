'use strict';

const Controller = require('egg').Controller;
const FileValidate = require('../../validate/FileValidate');
class FileController extends Controller {
  constructor(...arg) {
    super(...arg);
    this.service = 'file'; // 名称

    this.validate = new FileValidate(this.ctx);
  }

  // 上传
  async upload() {
    const { ctx } = this;
    const params = await this.validate.setScene('Upload').checkValidate();
    const result = await ctx.service[this.service].upload(params);
    this.ctx.success(result);
  }


}

module.exports = FileController;
