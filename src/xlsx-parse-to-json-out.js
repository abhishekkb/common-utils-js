const xlsx = require('xlsx');
const fs = require('fs');

const columnMappings = {
    Sheet1: {
        'Original Column 1': 'customKey1',
        'Original Column 2': 'customKey2',
        'Original Column 3': 'nested.customKey3',
        'Original Column 4': { arrayField: 'arrayFieldName', key: 'arrayObjectKey1' },
        'Original Column 5': { arrayField: 'arrayFieldName', key: 'arrayObjectKey2' }
        // Add mappings for all 20 columns
    },
    Sheet2: {
        'Original Column 1': 'customKeyA',
        'Original Column 2': 'customKeyB',
        'Original Column 3': 'nested.customKeyC',
        'Original Column 4': { arrayField: 'arrayFieldName', key: 'arrayObjectKeyA' },
        'Original Column 5': { arrayField: 'arrayFieldName', key: 'arrayObjectKeyB' }
        // Add mappings for all 20 columns
    },
    Sheet3: {
        'Original Column 1': 'customKeyX',
        'Original Column 2': 'customKeyY',
        'Original Column 3': 'nested.customKeyZ',
        'Original Column 4': { arrayField: 'arrayFieldName', key: 'arrayObjectKeyX' },
        'Original Column 5': { arrayField: 'arrayFieldName', key: 'arrayObjectKeyY' }
        // Add mappings for all 20 columns
    }
};

function setNestedField(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    while (keys.length > 1) {
        const key = keys.shift();
        if (!current[key]) {
            current[key] = {};
        }
        current = current[key];
    }
    current[keys[0]] = value;
}

function setArrayField(obj, arrayField, key, value) {
    if (!obj[arrayField]) {
        obj[arrayField] = [];
    }
    let arrayObject = obj[arrayField].find(item => item[key] === undefined);
    if (!arrayObject) {
        arrayObject = {};
        obj[arrayField].push(arrayObject);
    }
    arrayObject[key] = value;
}

function sheetToJson(worksheet, mappings) {
    const data = xlsx.utils.sheet_to_json(worksheet, { defval: null });
    return data.map(row => {
        const mappedRow = {};
        for (const originalKey in row) {
            const mapping = mappings[originalKey];
            if (typeof mapping === 'string') {
                setNestedField(mappedRow, mapping, row[originalKey]);
            } else if (mapping && typeof mapping === 'object') {
                setArrayField(mappedRow, mapping.arrayField, mapping.key, row[originalKey]);
            } else {
                mappedRow[originalKey] = row[originalKey]; // if there's no mapping, keep the original key
            }
        }
        return mappedRow;
    });
}

function workbookToJson(workbook) {
    const result = {};
    workbook.SheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const mappings = columnMappings[sheetName] || {};
        result[sheetName] = sheetToJson(worksheet, mappings);
    });
    return result;
}

const filePath = 'path_to_your_file.xlsx';
const workbook = xlsx.readFile(filePath);

const jsonData = workbookToJson(workbook);

fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2), 'utf8');

console.log('XLSX file has been converted to JSON with custom mappings, including arrays, and saved as output.json');
