const SequelizeModel = require('./SequelizeModel.cjs');

class StudentFile extends SequelizeModel {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        label: DataTypes.STRING(255),
        fileId: DataTypes.INTEGER,
        studentId: DataTypes.INTEGER,
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
      },
    );
  }
}

module.exports = StudentFile;
