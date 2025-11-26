import {logger} from '@utils/logger';
import { TEMPLATES } from '@config/constants';
import path from 'path';
import fs from 'fs-extra';
import https from 'https';
import { fileURLToPath } from 'url';

// Main function to get extension files
export async function getExtensionFiles(extensionType:string, dirName:string, authorName:string){

    const templates = TEMPLATES[extensionType];
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    if(!templates){
        logger.error("Invalid template");
        process.exit(1);
    }

    for(let template of templates){
        try{
            const rawUrl = template.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
            const fileName = path.basename(rawUrl);
            const outputPath = path.resolve(dirName, fileName);
            logger.info(`Downloading ${fileName}...`);
            await _downloadFileFromGithub(rawUrl, outputPath);
        }
        catch(error){
            logger.error(error);
            if(fs.existsSync(dirName)){
                fs.removeSync(dirName);
            }
            process.exit(1);
        }
    }

    // Post-processing: update app.d.ts reference in custom-source.d.ts if it exists
    const customSourcePath = path.resolve(dirName, 'custom-source.d.ts');
    if (fs.existsSync(customSourcePath)) {
        let content = fs.readFileSync(customSourcePath, 'utf-8');
        content = content.replace(
            /\/\/\/ <reference path="\.\.\/goja_plugin_types\/app\.d\.ts" \/>/,
            '/// <reference path="./app.d.ts" />'
        );
        fs.writeFileSync(customSourcePath, content, 'utf-8');
    }

    const localFiles = await fs.readdir(path.resolve(__dirname, "providers", extensionType));

    for(let file of localFiles){
        try{
            const filePath = path.resolve(__dirname, "providers", extensionType, file);
            let data:any = fs.readFileSync(filePath, 'utf-8');
            if(file == 'manifest.json'){
                data = JSON.parse(data);
                data['id'] = dirName.toLowerCase().replace(/\s+/g, '-');
                data['name'] = _normalizeExtensionName(dirName);
                data['author'] = authorName ?? '';
                data['payloadURI'] = `${path.resolve(dirName)}\\provider.ts`;
                data['language'] = 'typescript';
                
                file = `${data['id']}.json`;
                
                data = JSON.stringify(data, null, 2);

            }
    
            await fs.outputFile(path.resolve(dirName, file), data);
        }
        catch(error){

            logger.error(error);
            if(fs.existsSync(dirName)){
                fs.removeSync(dirName);
            }

            process.exit(1);
        }
    }
}

// Helper function to download a file from GitHub
function _downloadFileFromGithub(rawUrl: string, outputPath: string) {
    return new Promise<void>((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);
        https.get(rawUrl, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', err => {
            fs.unlinkSync(outputPath);
            reject(err.message);
        });
    });
}

// Helper function to normalize extension name
function _normalizeExtensionName(extensionName:string){

    return extensionName.replace(/[^a-zA-Z0-9\s]+/g, '');

}