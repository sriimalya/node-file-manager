import * as fs from 'node:fs/promises';
import path from 'node:path'

export async function createFolder(folderPath){
    await fs.mkdir(folderPath, {recursive: true})
}

export async function createFile(filePath, content=''){
    await fs.writeFile(filePath, content);
}

export async function readFile(filePath){
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
}

export async function writeFile(filePath, content){
    await fs.appendFile(filePath, content);
}

export async function deleteFile(filePath){
    await fs.unlink(filePath);
}

export async function deleteFolder(folderPath){
    await fs.rm(folderPath, {recursive: true});
}

export async function listItems(folderPath){
    const items = await fs.readdir(folderPath, {withFileTypes: true});
    return items.map((item)=> {
        return {
            name: item.name,
            type: item.isDirectory() ? 'folder' : 'file',
            path: path.join(import.meta.dirname, item.name)
        }
    })
}
