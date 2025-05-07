const SequelizeModel = require('./SequelizeModel.cjs');

class Student extends SequelizeModel {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        fullname: DataTypes.STRING(255),
        birthdate: DataTypes.DATE,
        cpf: DataTypes.STRING(14),
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
      },
    );
  }
}

module.exports = Student;
