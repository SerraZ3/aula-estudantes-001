// import 'dotenv/config';
require('dotenv').config();

const database = process.env.POSTGRES_DB || 'question';
const host = process.env.POSTGRES_HOST || '127.0.0.1';
const username = process.env.POSTGRES_USER;
const password = process.env.POSTGRES_PASSWORD;
const port = process.env.POSTGRES_PORT || 5432;

const db = {
  host,
  username,
  password,
  database,
  dialect: 'postgres',
  logging: false,
  seederStorage: 'sequelize',
  port
};

module.exports = {
  testing: db,
  development: db,
  staging: db,
  production: db,
};
