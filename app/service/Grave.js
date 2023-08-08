'use strict';

const BaseService = require('./BaseService');

class GraveService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
    this.model = 'Grave'; // 模型名称
  }

  async create(params) {
    const { ctx } = this;
    const _where = { code: params.code };
    const cur = await ctx[this.delegate][this.model].findOne({
      where: _where,
    });
    if (cur) {
      this.ctx.error('编码不能重复');
    }
    const result = await ctx[this.delegate][this.model].create(params);
    return result;
  }

  // 新增grave+新增master+新增page
  async createGrave(params) {
    const { ctx } = this;
    const _where = { code: params.code };
    const cur = await ctx[this.delegate][this.model].findOne({
      where: _where,
    });
    console.log(cur);
    if (cur) {
      this.ctx.error('编码不能重复');
    }
    const transaction = await this.ctx[this.delegate].transaction();
    try {
      // 创建grave
      const grave = await ctx[this.delegate][this.model].create(params);
      const grave_id = grave.id;

      // 生成二维码
      const url = `http://mingzhi.zongxintang.com/v1/${grave.code}`;
      const qr_code = await ctx.helper.createQrcode(url);
      await ctx[this.delegate].GraveUrl.create({
        grave_id,
        url,
        qr_code,
      });

      // 创建主人
      const masterParam = {
        grave_id,
        name: '主人姓名',
        identity: '慈父',
        is_die: 1,
        is_master: 1,
      };
      await ctx[this.delegate].Member.create(masterParam);

      // 创建页面
      const pageParam = {
        grave_id,
        name: '默认页面',
        template_id: 1, // 待优化
        is_active: 1,
      };
      await ctx[this.delegate].Page.create(pageParam);

      await transaction.commit();
      return grave;
    } catch (error) {
      transaction.rollback();
      this.ctx.throw(500, error.message || '服务器错误');
    }
  }

  async getQrcode(params) {
    const { ctx } = this;
    const _where = { id: params.id };
    const grave = await ctx[this.delegate][this.model].findOne({
      where: _where,
    });
    const result = grave.getGrave_url();
    console.log(result);
    return result;
  }


}

module.exports = GraveService;
