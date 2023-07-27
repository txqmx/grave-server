'use strict';

const BaseService = require('./BaseService');

class IndexService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
  }

  async getHomeInfo(params) {
    const { ctx } = this;

    // 获取墓碑
    const grave = await ctx[this.delegate].Grave.findOne({ code: params.code });
    if (!grave) {
      this.ctx.error('不存在');
    }
    // 获取页面
    const pages = await grave.getPages({
      where: {
        is_active: 1,
      },
    });

    if (!pages.length) {
      this.ctx.error('页面未配置');
    }
    const page = pages[0];
    const template = await page.getPage_template();

    const data = page.content ? JSON.parse(page.content) : {};
    const config = template.config ? JSON.parse(template.config) : [];

    for (let i = 0; i < config.length; i++) {
      const item = config[i];
      item.data = await this.parseData(data[item.dataSource], grave.id);
      delete item.fields;
      delete item.dataSource;
    }
    return config;
  }

  // 内容解析
  async parseData(data, grave_id) {
    if (!data) return {};
    for (const k in data) {
      if (data[k].indexOf('$model') !== -1) {
        const [ type, modelWhere, fild ] = data[k].split('.');
        const [ model, whereStr ] = modelWhere.split('?');
        const where = {
          grave_id,
        };
        if (whereStr) {
          const [ key, value ] = whereStr.split('=');
          where[key] = value;
        }
        const result = await this.ctx[this.delegate][model].findOne(where);
        data[k] = result[fild] || '';
      }
    }
    return data;

  }

}

module.exports = IndexService;
