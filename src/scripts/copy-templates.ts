import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, '../providers');
const dest = path.join(__dirname, '../../dist/providers');

async function copyProviders(){

    fs.ensureDirSync(dest);
    await fs.copy(src, dest);
}

copyProviders();