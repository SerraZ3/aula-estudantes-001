const SequelizeModel = require('./SequelizeModel.cjs');

class User extends SequelizeModel {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        fullname: DataTypes.STRING(255),
        role: {
          type: DataTypes.ENUM('admin', 'user'),
          defaultValue: 'user',
        },
        email: DataTypes.STRING(150),
        password: DataTypes.STRING(150),
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
      },
    );
  }
}

module.exports = User;
