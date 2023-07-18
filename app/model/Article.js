'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TINYINT, TEXT } = app.Sequelize;
  const Article = model.define('article', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    grave_id: INTEGER,
    admin_id: INTEGER,
    title: STRING(255),
    desc: STRING(255),
    cover: STRING(255),
    abstract: TEXT('long'),
    content: TEXT('long'),
    imgs: TEXT('long'),
    audio: STRING(255),
    type: { type: TINYINT(1), defaultValue: 1 }, // 1-文章，2图文
    sort: INTEGER,
    is_show: { type: TINYINT(1), defaultValue: 1 },
  });

  return Article;
};
