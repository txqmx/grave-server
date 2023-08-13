'use strict';

const BaseService = require('./BaseService');

class HomeService extends BaseService {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model'; // ctx.model
  }

  async getHomeInfo(params) {
    const { ctx } = this;

    // 获取墓碑
    const grave = await ctx[this.delegate].Grave.findOne({
      where: { code: params.code },
    });

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

    const config = template.config ? JSON.parse(template.config) : [];

    const pageData = page.content ? JSON.parse(page.content) : {};
    const defaultData = template.content ? JSON.parse(template.content) : {};
    const defaultConfigValue = {};

    config.forEach(item => {
      const params = {};
      if (Array.isArray(item.fields)) {
        item.fields.forEach(field => {
          params[field.field] = field.defaultValue;
        });
      }
      defaultConfigValue[item.dataSource] = params;
    });

    const data = { ...defaultConfigValue, ...defaultData, ...pageData };


    for (let i = 0; i < config.length; i++) {
      const item = config[i];
      item.data = await this.parseData(data[item.dataSource], grave.id);
      delete item.fields;
      delete item.dataSource;
    }
    return config;
  }

  async getGraveInfo(params) {
    const { ctx } = this;
    const result = await ctx.model.Grave.findOne({
      where: { code: params.code },
    });
    return result;
  }

  async getMasterInfo(params) {
    const { ctx } = this;

    // 获取墓碑
    const grave = await ctx[this.delegate].Grave.findOne({
      where: {
        code: params.code,
      },
    });
    if (!grave) {
      this.ctx.error('不存在');
    }
    // 获取页面
    const members = await grave.getMembers({
      where: {
        is_master: 1,
      },
      include: 'mate',
    });

    if (!members.length) {
      this.ctx.error('人物未配置');
    }
    const member = members[0];
    return member;
  }

  // 内容解析
  // $model.Grave.detail
  // $model.Member?is_master=1.detail
  async parseData(data, grave_id) {
    if (!data) return {};

    for (const k in data) {
      // 判断字符串
      if (typeof data[k] === 'string' && data[k].indexOf('$model') !== -1) {
        const [ type, modelWhere, fild ] = data[k].split('.');
        const [ model, whereStr ] = modelWhere.split('?');
        const where = {};
        if (model === 'Grave') {
          where.id = grave_id;
        } else {
          where.grave_id = grave_id;
        }
        if (whereStr) {
          const [ key, value ] = whereStr.split('=');
          where[key] = value;
        }
        const result = await this.ctx[this.delegate][model].findOne({ where });
        data[k] = result[fild] || '';
      }
    }
    return data;

  }

}

module.exports = HomeService;
