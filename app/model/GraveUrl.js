'use strict';
module.exports = (app, model) => {
  const { INTEGER, TEXT } = app.Sequelize;

  const GraveUrl = model.define('grave_url', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    grave_id: INTEGER,
    url: TEXT('long'),
    qr_code: TEXT('long'),
  });

  GraveUrl.associate = () => {
    GraveUrl.belongsTo(model.Grave, { foreignKey: 'grave_id' });
  };


  return GraveUrl;
};
