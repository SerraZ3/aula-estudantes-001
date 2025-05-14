import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';

async function loginService({ email, password }) {
  const user = await Student.findOne({ where: { email } });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const passwordMatched = await hash.compareHash(password, user.password);
  if (!passwordMatched) {
    throw new Error('Senha incorreta');
  }
  const { secret, expiresIn } = authConfig.jwt;

  const token = sign({}, secret, {
    subject: `${user._id}`,
    expiresIn,
  });

  return { success: true, user, token };
}
export default loginService;
