const xlsx = require('xlsx');
const fs = require('fs');

const columnMappings = {
    'Custom Sheet Name 1': {
        'Original Column 1': 'customKey1',
        'Original Column 2': 'customKey2',
        'Original Column 3': 'nested.customKey3',
        'Original Column 4': { arrayField: 'arrayFieldName', key: 'arrayObjectKey1' },
        'Original Column 5': { arrayField: 'arrayFieldName', key: 'arrayObjectKey2' }
    },
    'Custom Sheet Name 2': {
        'Original Column 1': 'customKeyA',
        'Original Column 2': 'customKeyB',
        'Original Column 3': 'nested.customKeyC',
        'Original Column 4': { arrayField: 'arrayFieldName', key: 'arrayObjectKeyA' },
        'Original Column 5': { arrayField: 'arrayFieldName', key: 'arrayObjectKeyB' }
    },
    'Custom Sheet Name 3': {
        'Original Column 1': 'customKeyX',
        'Original Column 2': 'customKeyY',
        'Original Column 3': 'nested.customKeyZ',
        'Original Column 4': { arrayField: 'arrayFieldName', key: 'arrayObjectKeyX' },
        'Original Column 5': { arrayField: 'arrayFieldName', key: 'arrayObjectKeyY' }
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

function normalizeHeader(header) {
    return header.replace(/\r?\n|\r/g, ' ').trim();
}

function sheetToJson(worksheet, mappings) {
    const data = xlsx.utils.sheet_to_json(worksheet, { defval: null, header: 1 });
    const headers = data[0].map(normalizeHeader);
    const rows = data.slice(1);

    return rows.map(row => {
        const mappedRow = {};
        headers.forEach((header, index) => {
            const value = row[index];
            const mapping = mappings[header];
            if (typeof mapping === 'string') {
                setNestedField(mappedRow, mapping, value);
            } else if (mapping && typeof mapping === 'object') {
                setArrayField(mappedRow, mapping.arrayField, mapping.key, value);
            } else {
                mappedRow[header] = value;
            }
        });
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
