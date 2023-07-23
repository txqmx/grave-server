'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const PageTemplate = model.define('page_template', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(255),
    desc: STRING(255),
    cover: STRING(255),
    readme: TEXT('long'),
    config: TEXT('long'),
    content: TEXT('long'),
  });


  return PageTemplate;
};
