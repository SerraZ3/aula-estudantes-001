const SequelizeModel = require('./SequelizeModel.cjs');

class File extends SequelizeModel {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        path: DataTypes.STRING(255),
        extension: DataTypes.STRING(5),
        originalName: DataTypes.STRING(255),
        size: DataTypes.INTEGER,
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
      },
    );
  }
}

module.exports = File;
