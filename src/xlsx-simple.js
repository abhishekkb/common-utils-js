import xlsx from 'xlsx';
import fs from 'fs';

// Read the Excel file
const workbook = xlsx.readFile('input.xlsx'); // replace with your input file path
const sheetName = workbook.SheetNames[0]; // Assuming we want the first sheet
const worksheet = workbook.Sheets[sheetName];

// Convert sheet to JSON
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// Write JSON data to a file
fs.writeFileSync('output.json', JSON.stringify(jsonData, null, 2), 'utf-8');

console.log('Data has been written to output.json');
