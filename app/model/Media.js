'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TINYINT, TEXT } = app.Sequelize;

  const Media = model.define('media', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    grave_id: INTEGER,
    admin_id: INTEGER,
    title: STRING(255),
    desc: STRING(255),
    cover: STRING(255),
    url: STRING(255),
    abstract: TEXT('long'),
    content: TEXT('long'),
    type: { type: TINYINT(1), defaultValue: 1 }, // 1-音频，2-视频
    sort: INTEGER,
    is_show: { type: TINYINT(1), defaultValue: 1 },
  });

  return Media;
};
