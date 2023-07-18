'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TINYINT, TEXT } = app.Sequelize;

  const Photo = model.define('photo', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    grave_id: INTEGER,
    admin_id: INTEGER,
    title: STRING(255),
    desc: STRING(255),
    url: STRING(255),
    content: TEXT('long'),
    sort: INTEGER,
    is_show: { type: TINYINT(1), defaultValue: 1 },
  });

  return Photo;
};
