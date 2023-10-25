// import * as fs from 'fs'
// import {
//     stringConstructor,
//     arrayConstructor,
//     objectConstructor
// } from '../type/type'

const fs = require('fs');
const stringConstructor = "test".constructor;
const arrayConstructor = [].constructor;
const objectConstructor = ({}).constructor;

let rawData = readFileSync('./json/files/list.json');
let parsedList = JSON.parse(rawData);

console.log(parsedList);

let sortedList = parsedList.sort();

writeFileSync('./json/files/sortList.json', jsonToString(sortedList, true));


function readFileSync(fileName) {
    return fs.readFileSync(fileName);
}

function writeFileSync(fileName, data) {
    fs.writeFileSync(fileName, data)
}

function jsonToString(json, toPretty) {
    if (json === null || json === undefined) {
        return null;
    }

    let data;
    if (json.constructor === stringConstructor) {
        data = JSON.stringify(json);
    } else if (json.constructor === arrayConstructor || json.constructor === objectConstructor) {
        data = json;
    } else {
        return null;
    }

    if (toPretty) {
        return JSON.stringify(data, null, 4);
    } else {
        return JSON.stringify(data);
    }
}
