function flattenKeys(obj, parentKey = '', separator = '_') {
    let result = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const currentKey = parentKey ? `${parentKey}${separator}${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                // Recursively flatten nested objects
                const nestedKeys = flattenKeys(obj[key], currentKey, separator);
                result = { ...result, ...nestedKeys };
            } else {
                // Flatten current key
                result[currentKey] = obj[key];
            }
        }
    }

    return result;
}

// Example usage:
const nestedJsonData = {
    user: {
        name: 'John',
        address: {
            city: 'New York',
            zip: '10001',
        },
    },
    age: 25,
    preferences: {
        music: {
            genre: 'Rock',
            instrument: 'Guitar',
        },
        color: 'Blue',
    },
};

const flattenedKeys = flattenKeys(nestedJsonData);

console.log(flattenedKeys);
