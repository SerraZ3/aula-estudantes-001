import path from 'path';
import { fileURLToPath } from 'url';

// Emula __filename e __dirname no modo ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadConfig = {
  path: path.join(__dirname, '..', 'tmp', 'files'),
};

export default uploadConfig;
