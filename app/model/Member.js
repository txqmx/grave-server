'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TINYINT, TEXT } = app.Sequelize;

  const Member = model.define('member', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    grave_id: INTEGER,
    pid: { type: INTEGER, defaultValue: 0 },
    name: STRING(255),
    sex: { type: TINYINT(1), defaultValue: 1 }, // 0-女 1-男
    identity: STRING(255),
    native: STRING(255),
    avatar: STRING(255),
    desc: STRING(255),
    timeline: TEXT('long'),
    detail: TEXT('long'),
    birth_time: STRING(255),
    die_time: STRING(255),
    is_die: { type: TINYINT(1), defaultValue: 0 },
    is_master: { type: TINYINT(1), defaultValue: 0 },
  });

  Member.associate = () => {
    Member.hasOne(model.Mate, { foreignKey: 'mate_id', as: 'mate', onDelete: 'SET NULL' });
    Member.belongsTo(model.Grave, { foreignKey: 'grave_id' });
  };

  return Member;
};
