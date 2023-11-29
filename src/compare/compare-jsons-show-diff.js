import { promises as fsPromises } from 'fs';
import yaml from 'js-yaml';

async function readJsonFile(filePath) {
    try {
        const fileContent = await fsPromises.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading YAML file ${filePath}: ${error.message}`);
        throw error;
    }
}

async function compareYAMLFiles(file1Path, file2Path, inputKey) {
    try {
        const data1 = await readJsonFile(file1Path);
        const data2 = await readJsonFile(file2Path);

        const keys1 = data1[inputKey] ? Object.keys(data1[inputKey]) : [];
        const keys2 = data2[inputKey] ? Object.keys(data2[inputKey]) : [];

        const diffLog = [];
        const allKeys = new Set([...keys1, ...keys2]);

        diffLog.push(`Key/Value differences under '${inputKey}':`);

        for (const key of allKeys) {
            const value1 = data1[inputKey] ? data1[inputKey][key] : undefined;
            const value2 = data2[inputKey] ? data2[inputKey][key] : undefined;

            if (value1 !== value2) {
                diffLog.push(`${key}:`);
                diffLog.push(`  ${file1Path}: ${value1}`);
                diffLog.push(`  ${file2Path}: ${value2}`);
            }
        }

        // Write differences to diff.log
        await fsPromises.writeFile('diff.log', diffLog.join('\n'));
    } catch (error) {
        console.error(`Error comparing YAML files: ${error.message}`);
    }
}

const file1Path = './src/compare/files/before.json';
const file2Path = './src/compare/files/after.json';
const inputKey = 'person1';

await compareYAMLFiles(file1Path, file2Path, inputKey);
