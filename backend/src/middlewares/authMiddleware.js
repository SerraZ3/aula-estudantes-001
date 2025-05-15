import jsonwebtoken from 'jsonwebtoken';
import authConfig from '../config/auth.js';
import models from '../database/models/index.cjs';
const { User, UserToken } = models;
import Debug from 'debug';
const debug = Debug('authMiddleware:dev');

function authMiddleware(roles) {
  const handleAuth = async (req, res, next) => {
    debug('Executando');
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: true, message: 'Sem permissão' });
    }

    const [, token] = authHeader.split(' ');

    let decoded;
    try {
      decoded = jsonwebtoken.verify(token, authConfig.jwt.secret);
    } catch (error) {
      return res.status(401).json({ error: true, message: 'Token expirado' });
    }
    const { sub } = decoded;
    if (roles && roles.length > 0) {
      let hasRole = false;
      try {
        let user = await User.findOne({ where: { id: sub } });
        for (let i = 0; i < roles.length; i++) {
          const role = roles[i];
          if (user.role === role) {
            hasRole = true;
            continue;
          }
        }
      } catch (error) {
        console.log(error);
      }
      if (!hasRole) {
        return res.status(401).json({ error: true, message: 'Sem permissão' });
      }
    }

    req.user = {
      id: sub,
    };

    return next();
  };
  return handleAuth;
}

export default authMiddleware;
