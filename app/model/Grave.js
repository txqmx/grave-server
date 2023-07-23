'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const Grave = model.define('grave', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    admin_id: INTEGER,
    code: STRING(255),
    name: STRING(255),
    password: STRING(255),
    cover: STRING(255),
    address: STRING(255),
    desc: STRING(255),
    detail: TEXT('long'),
  });

  Grave.associate = () => {
    Grave.belongsTo(model.Admin, { foreignKey: 'admin_id' });
    Grave.hasMany(model.Member, { foreignKey: 'grave_id' });
    Grave.hasMany(model.Page, { foreignKey: 'grave_id' });
  };

  return Grave;
};
