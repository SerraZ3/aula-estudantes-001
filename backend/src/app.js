import 'dotenv/config';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import Debug from 'debug';
const { PREFIX = '/v1', PORT = 3000 } = process.env;
const debug = Debug('SERVER:dev');

import { errors } from 'celebrate';

import indexRoute from './routes/index.js';

const app = express();

// Aumenta o limite de upload para no máximo 50mb
// ! Sempre é bom limitar isso, pois existem ataque hacker em força o envio de scripts em arquivos grandes
app.use(bodyParser.json({ limit: '50mb' }));

// Só aceita requisições JSON
app.use(bodyParser.urlencoded({ extended: false }));

// Pacote com algumas configurações de segurança
app.use(helmet());

// Retorna erros arrumado para o cliente
app.use(errors());

app.use(PREFIX, indexRoute);

app.listen(PORT, () => {
  debug(`Servidor rodando em: http://localhost:${PORT}${PREFIX}`);
});
