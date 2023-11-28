const fs = require('fs');
const jsonpath = require('jsonpath');

const jsonFilePath = 'input-file.json';
const jsonPath = '$.person.address.city';

try {

    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
    const data = jsonpath.query(jsonData, jsonPath);

    const extractedFields = [];
    for (const d of data) {
        extractedFields.push(d);
    }

    const textData = extractedFields.join('\n');

    const textFilePath = 'output.txt';

    fs.writeFileSync(textFilePath, textData, 'utf8');

    console.log(`Data extracted and saved to ${textFilePath}`);
} catch (error) {
    console.error('Error extracting data:', error);
}
