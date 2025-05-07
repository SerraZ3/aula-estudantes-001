const cors = require('cors');

const { CorsError } = require('../modules/Errors');

const { env } = require('../config');

function origin(url, next) {
  const host = url ? new URL(url).host : null;
  if (env === 'production' && url && !(host.includes('.codilo.com.br') || host.includes('.codilo.net.br') || host.includes('.capturaweb.com.br'))) {
    return next(new CorsError());
  }
  return next(null, true);
}

const options = { origin, credentials: true };

module.exports = cors(options);
