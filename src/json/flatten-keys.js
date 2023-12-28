function flattenKeys(obj, separator = '.') {
    let result = {};

    const processObject = (currentObj, parentKey = '') => {
        Object.keys(currentObj).forEach(key => {
            const currentKey = parentKey ? `${parentKey}${separator}${key}` : key;

            if (Array.isArray(currentObj[key])) {
                currentObj[key].forEach((item, index) => {
                    const arrayKey = `${currentKey}${separator}${index}`;
                    if (typeof item === 'object' && item !== null) {
                        processObject(item, arrayKey);
                    } else {
                        result[arrayKey] = item;
                    }
                });
            } else if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                processObject(currentObj[key], currentKey);
            } else {
                result[currentKey] = currentObj[key];
            }
        });
    };

    processObject(obj);

    return result;
}

// Example usage:
const nestedJsonDataWithArrays = {
    user: {
        name: 'John',
        addresses: [
            {
                city: 'New York',
                zip: '10001',
            },
            {
                city: 'San Francisco',
                zip: '94105',
            },
        ],
    },
    age: 25,
    preferences: {
        music: [
            {
                genre: 'Rock',
                instrument: 'Guitar',
            },
            {
                genre: 'Pop',
                instrument: 'Piano',
            },
        ],
        color: 'Blue',
    },
};

const flattenedKeysWithArrays = flattenKeys(nestedJsonDataWithArrays);

console.log(flattenedKeysWithArrays);
