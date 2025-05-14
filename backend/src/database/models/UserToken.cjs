const SequelizeModel = require('./SequelizeModel.cjs');

class UserToken extends SequelizeModel {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        token: DataTypes.STRING(255),
        userId: DataTypes.INTEGER,
        type: DataTypes.STRING(100),
        isRevoked: DataTypes.BOOLEAN,
        tokenExpiration: DataTypes.DATE,
      },
      {
        sequelize,
        paranoid: true,
        timestamps: true,
      },
    );
  }
}

module.exports = UserToken;
