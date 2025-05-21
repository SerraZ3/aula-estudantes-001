import Debug from 'debug';
import fs from 'node:fs/promises';
import path from 'node:path';
import models from '../../database/models/index.cjs';
import uploadConfig from '../../config/upload.js';
const { File } = models;
const debug = Debug('fileCreateService:dev');

async function fileCreateService({ fileId }) {
  try {
    debug('Start', fileId);

    const file = await File.findOne({ where: { id: fileId } });

    // Se existir o cpf gera erro
    if (!file) {
      return { error: true, message: 'Arquivo não encontrado!' };
    }

    let fileBase64 = await fs.readFile(
      path.join(uploadConfig.path, file.path),
      {
        encoding: 'base64',
      },
    );
    return {
      success: true,
      data: `data:application/pdf;base64,${fileBase64}`,
      extension: file.extension,
    };
  } catch (error) {
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default fileCreateService;
