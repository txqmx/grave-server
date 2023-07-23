'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TINYINT, TEXT } = app.Sequelize;

  const Page = model.define('page', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    grave_id: INTEGER,
    template_id: INTEGER,
    name: STRING(255),
    desc: STRING(255),
    readme: TEXT('long'),
    content: TEXT('long'),
    is_active: { type: TINYINT(1), defaultValue: 0 },
  });


  return Page;
};
