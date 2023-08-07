'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TINYINT, TEXT } = app.Sequelize;

  const Admin = model.define('admin', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    root: { type: TINYINT(1), defaultValue: 0 },
    user_name: STRING(255),
    password: STRING(255),
    name: STRING(255),
    code: STRING(255),
    avatar: STRING(255),
    email: STRING(255),
    phone: STRING(255),
    remark: TEXT('long'),
    grave_limit: { type: INTEGER, defaultValue: 0 },
  });

  Admin.associate = () => {
    Admin.hasMany(model.Grave, { foreignKey: 'admin_id', as: 'graves' });
  };

  return Admin;
};
