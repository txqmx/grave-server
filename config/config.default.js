/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');
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
  config.cluster = {
    listen: {
      // path: '',
      port: 7001,
      // hostname: '127.0.0.1', // 0.0.0.0
    },
  };

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

  config.multipart = {
    mode: 'file',
    // tmpdir: path.join(__dirname, '..', 'tmp', appInfo.name),
    // fileExtensions: [ '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp' ],
    fileSize: '300mb',
    // cleanSchedule: { cron: '0 30 4 * * *' },
  };

  config.static = {
    dir: [{
      prefix: '/upload',
      dir: path.join(appInfo.baseDir, '', 'upload'),
    }],
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    file: {
      disk: path.join(__dirname, '..', 'upload'),
    },
  };


  return {
    ...config,
    ...userConfig,
  };
};
