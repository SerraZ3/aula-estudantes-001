import Debug from 'debug';
import uploadConfig from '../../config/upload.js';
import models from '../../database/models/index.cjs';
const { Student, File, StudentFile } = models;
const debug = Debug('fileCreateService:dev');

async function fileCreateService({ files, studentId }) {
  const trx = await models.sequelize.transaction();
  try {
    debug('Start', files, studentId);

    const student = await Student.findOne({ where: { id: studentId } });

    // Se existir o cpf gera erro
    if (!student) {
      return { error: true, message: 'Estudante não encontrado!' };
    }
    let extension = files.historico[0].originalname.split('.');
    extension = extension[extension.length - 1];
    console.log();
    console.log(files.historico);
    const filename = files.historico[0].filename;
    const originalName = files.historico[0].originalname;
    const size = files.historico[0].size;
    const fileInfo = {
      path: filename,
      originalName,
      extension,
      size,
    };
    const file = await File.create(
      fileInfo,

      { transaction: trx },
    );
    await StudentFile.create(
      {
        studentId: student.id,
        fileId: file.id,
        label: 'Historico',
      },
      { transaction: trx },
    );
    await trx.commit();
    return { success: true, data: file };
  } catch (error) {
    await trx.rollback();
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default fileCreateService;
