require('dotenv').config();
// import 'dotenv/config';

const config = {};

config.appName = process.env.APP_NAME || 'question';
config.env = process.env.NODE_ENV || 'development';
config.defaultPort = process.env.PORT || '3002';

module.exports = config;
