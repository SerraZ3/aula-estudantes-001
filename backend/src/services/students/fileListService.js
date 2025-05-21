import Debug from 'debug';
import fs from 'node:fs/promises';
import path from 'node:path';
import models from '../../database/models/index.cjs';
import uploadConfig from '../../config/upload.js';
const { Student, StudentFile, File } = models;
const debug = Debug('fileListService:dev');

async function fileListService({ studentId }) {
  try {
    debug('Start', studentId);

    const student = await Student.findOne({ where: { id: studentId } });
    const studentFiles = await StudentFile.findAll({
      where: { studentId: student.id },
    });
    const files = await Promise.all(
      studentFiles.map(async (studentFile) => {
        const file = await File.findOne({ where: { id: studentFile.fileId } });
        const fileBase64 = await fs.readFile(
          path.join(uploadConfig.path, file.path),
          {
            encoding: 'base64',
          },
        );
        return {
          data: `data:application/pdf;base64,${fileBase64}`,
          extension: file.extension,
        };
      }),
    );

    return { success: true, files };
  } catch (error) {
    debug('Error:', error);
    return { error: true, message: 'A operação falhou, contate o suporte' };
  }
}
export default fileListService;
