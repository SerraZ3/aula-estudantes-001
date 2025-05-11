const crypto = require('crypto');

function hashConvert(type, value) {
  return crypto.createHash(type).update(value).digest('hex');
}

function md5(value) {
  return hashConvert('md5', value);
}

function sha1(value) {
  return hashConvert('sha1', value);
}
const hash = {
  md5,
  sha1,
};
module.exports = hash;
