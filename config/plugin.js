'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // jwt: {
  //   enable: true,
  //   package: 'egg-jwt',
  // },
  sequelize: {
    enable: false,
    package: 'egg-sequelize',
  },
  validatePlus: {
    enable: true,
    package: 'egg-validate-plus',
  },
  // cors: {
  //   enable: true,
  //   package: 'egg-cors',
  // },
  // multipart: {
  //   enable: true,
  //   package: 'egg-multipart',
  // },
  // static: {
  //   enable: true,
  //   package: 'egg-static',
  // },
};
