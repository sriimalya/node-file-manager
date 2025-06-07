import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import chalk from 'chalk';

import { createFolder, createFile, readFile, writeFile, deleteFile, deleteFolder, listItems } from './fs.js';

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
})

console.log(chalk.blue.bold('\n📂 File System Manager\n'))

const options = [
    'Create Folder',
    'Create File',
    'Read File',
    'Write to File',
    'Delete File',
    'Delete Folder',
    'List Items',
    'Exit',
];

options.forEach((opt, i) => {
    console.log(chalk.yellow(`${i + 1}. ${chalk.white(opt)}`));
})

async function menu() {
    const option = await rl.question(chalk.cyan('\nSelect an option: '));

    switch (option) {
        case '1':
            const folderPath = await rl.question(chalk.white('\nEnter folder path: '));
            await createFolder(folderPath);
            console.log(chalk.green('✅ Folder created'));
            break;
        case '2':
            const filePath = await rl.question(chalk.white('\nEnter file path: '));
            const initialContent = await rl.question(chalk.white('Enter initial content (optional): '));
            await createFile(filePath, initialContent);
            console.log(chalk.green('✅ File created'));
            break;
        case '3':
            try {
                const readFilePath = await rl.question(chalk.white('\nEnter file path to read: '));
                const fileContent = await readFile(readFilePath);
                console.log(chalk.green('📄 File content:'));
                console.log(chalk.gray(fileContent));
            } catch (error) {
                console.error(chalk.red('❌ Error reading file:', error.message));
            }
            break;
        case '4':
            const appendFilePath = await rl.question(chalk.white('\nEnter file path to write to: '));
            const appendContent = await rl.question(chalk.white('Enter content to append: '));
            await writeFile(appendFilePath, `\n${appendContent}`);
            console.log(chalk.green('✅ Content appended to file'));
            break;
        case '5':
            try {
                const deleteFilePath = await rl.question(chalk.white('\nEnter file path to delete: '));
                await deleteFile(deleteFilePath);
                console.log(chalk.green('✅ File deleted'));
            } catch (error) {
                console.error(chalk.red('❌ Error deleting file:', error.message));
            }
            break;
        case '6':
            try {
                const deleteFolderPath = await rl.question(chalk.white('\nEnter folder path to delete: '));
                await deleteFolder(deleteFolderPath);
                console.log(chalk.green('✅ Folder deleted'));
            } catch (error) {
                console.error(chalk.red('❌ Error deleting folder:', error.message));   
            }
            break;
        case '7':
            const folderToListPath = await rl.question(chalk.white('\nEnter folder path to list items (↵ for current folder): '));
            const items = await listItems(folderToListPath || '.');

            console.log(chalk.blue('Folder Contents:'));
            items.forEach(items => {
                const icon = items.type === 'folder' ? chalk.white('📁') : chalk.white('📄');
                console.log(`${icon} ${chalk.yellow(items.name)}`);
            })
            break;
        case '8':
            rl.close();
            return;
        default:
            console.log(chalk.red('❌ Invalid option, please try again.'));
            break;
    }

    await rl.question(chalk.gray('\nPress Enter to continue...'));
    menu();
}

menu()