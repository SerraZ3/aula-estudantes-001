/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');

// eslint-disable-next-line import/no-dynamic-require
const config = require(path.join(__dirname, '../../config/databaseKnex.cjs'));
const knex = require('knex')(config);

class SequelizeModel extends Sequelize.Model {
  static knex(value) {
    if (value) return knex(value);
    return knex;
  }

  static getValueString(value) {
    return value ? value.toString() : '';
  }

  static toUpper(value) {
    return value.toUpperCase();
  }

  static uuid() {
    return uuidv4();
  }

  static treatNull(value) {
    if (value === null) return null;
    if (value === undefined) return null;
    if (value === 'null') return null;
    return value;
  }

  static toLower(value) {
    return value.toLowerCase();
  }

  static async paginate(options = {}) {
    let { page = 1, limit = 20 } = options;

    const { sortBy = 'createdAt', sortDesc = false } = options;

    if (!page || page <= 0) {
      page = 1;
    }

    limit = Number(limit);

    if (!limit || limit < 0) {
      limit = 0;
    }

    const offset = limit * (page - 1);

    const optionsParams = {
      order: [[sortBy, sortDesc === 'true' ? 'DESC' : 'ASC']],
      ...options,
      limit,
      offset,
    };

    const { count, rows } = await this.findAndCountAll(optionsParams);

    return {
      total: count,
      result: rows,
    };
  }
}

module.exports = SequelizeModel;
