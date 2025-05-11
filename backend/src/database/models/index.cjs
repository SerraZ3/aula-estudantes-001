const fs = require('fs');
const path = require('path');
const cls = require('cls-hooked');
const Sequelize = require('sequelize');
const debug = require('debug')('models:dev');

const { env } = require('../../config/index.cjs');
// eslint-disable-next-line import/no-dynamic-require
const config = require(path.join(__dirname, '../../config/database.cjs'))[env];

const clsNamespace = cls.createNamespace('transactions-namespace');
Sequelize.useCLS(clsNamespace);

const sequelize = new Sequelize(config.database, null, null, config);

// Monta as models dinamicamente
const basename = path.basename(__filename);
const files = fs.readdirSync(__dirname);
const modelsPath = files.filter((file) => /.js$/.test(file) && file !== basename && file !== 'SequelizeModel.cjs');
const db = {};
for (let modelPath of modelsPath) {
  modelPath = path.join(__dirname, modelPath);
  const model = require(modelPath);
  db[model.name] = model.init(sequelize, Sequelize);
}

async function transaction(task) {
  // NOTE SQLITE can have only 1 active transaction
  return clsNamespace.get('transactions-namespace') ? task() : sequelize.transaction(task);
}

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(db)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(db));

Object.values(db).forEach((model) => debug('Available', model));

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.transaction = transaction;

module.exports = db;
