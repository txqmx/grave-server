'use strict';
module.exports = (app, model) => {
  const { STRING, INTEGER, TINYINT, TEXT } = app.Sequelize;

  const Mate = model.define('mate', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    grave_id: INTEGER,
    name: STRING(255),
    sex: { type: TINYINT(1), defaultValue: 0 }, // 0-女 1-男
    identity: STRING(255),
    native: STRING(255),
    avatar: STRING(255),
    desc: STRING(255),
    timeline: TEXT('long'),
    detail: TEXT('long'),
    mate_id: INTEGER,
    birth_time: STRING(255),
    die_time: STRING(255),
    is_die: { type: TINYINT(1), defaultValue: 0 },
  });

  Mate.associate = () => {
    Mate.belongsTo(model.Member, { foreignKey: 'mate_id' });
  };

  return Mate;
};
