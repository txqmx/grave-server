/* eslint valid-jsdoc: "off" */

'use strict';

const { datasourceConfig } = require('./datasource.dev');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1688200877377_3940';

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'notFound' ];

  // config.onerror = {
  //   all(err, ctx) {
  //     ctx.set({
  //       'Content-Type': 'application/json',
  //     });
  //     const status = err.status || 500;
  //     ctx.body = {
  //       code: 0,
  //       message: err.message,
  //     };
  //     ctx.status = status;
  //   },
  // };

  config.jwt = {
    secret: 'grave',
    sign: {	// jwt.sign(***,***,[options,***])方法中，options的默认设置可以在这里配置；
      // 过期时间8小时
      expiresIn: 8 * (60 * 60), // 多少s后过期。actionToken.js中,jwt.sing(plyload,secret,{expiresIn:number})会被合并，调用时设置优先级更高;
    },
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.validatePlus = {
    convert: true,
    widelyUndefined: true,
  };


  config.sequelize = {
    datasources: datasourceConfig(),
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
