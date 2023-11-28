import { promises as fsPromises } from 'fs';
import yaml from 'js-yaml';

async function readYAMLFile(filePath) {
    try {
        const fileContent = await fsPromises.readFile(filePath, 'utf-8');
        return yaml.load(fileContent);
    } catch (error) {
        console.error(`Error reading YAML file ${filePath}: ${error.message}`);
        throw error;
    }
}

async function compareYAMLFiles(file1Path, file2Path, inputKey) {
    try {
        const data1 = await readYAMLFile(file1Path);
        const data2 = await readYAMLFile(file2Path);

        const keys1 = data1[inputKey] ? Object.keys(data1[inputKey]) : [];
        const keys2 = data2[inputKey] ? Object.keys(data2[inputKey]) : [];

        // const allKeys = new Set([...keys1, ...keys2]);

        console.log(`Key/Value differences under '${inputKey}':`);

        for (const key of keys1) {
            const value1 = data1[inputKey] ? data1[inputKey][key] : undefined;
            const value2 = data2[inputKey] ? data2[inputKey][key] : undefined;

            if (value1 !== value2) {
                console.log(`${key}:`);
                console.log(`  ${file1Path}: ${value1}`);
                console.log(`  ${file2Path}: ${value2}`);
            }
        }
    } catch (error) {
        console.error(`Error comparing YAML files: ${error.message}`);
    }
}

const file1Path = './src/compare/files/before.yaml';
const file2Path = './src/compare/files/after.yaml';
const inputKey = 'person1';

await compareYAMLFiles(file1Path, file2Path, inputKey);
