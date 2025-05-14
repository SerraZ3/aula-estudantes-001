import { compare, hash as hashBcrypt } from 'bcrypt';

const hash = {
  generateHash: (payload) => {
    return hashBcrypt(payload, 8);
  },
  compareHash: (payload, hashed) => {
    return compare(payload, hashed);
  },
};

export default hash;
