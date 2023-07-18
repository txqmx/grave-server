'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TINYINT, TEXT } = app.Sequelize;

  const Admin = model.define('admin', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    root: { type: TINYINT(1), defaultValue: 0 },
    user_name: STRING(255),
    password: STRING(255),
    name: STRING(255),
    avatar: STRING(255),
    email: STRING(255),
    phone: STRING(255),
    remark: TEXT('long'),
  });

  return Admin;
};
