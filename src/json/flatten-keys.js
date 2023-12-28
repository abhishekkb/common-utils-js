function flattenKeys(obj, separator = '.') {
    if(!obj) {
        return {};
    }

    let result = {};

    const flatten = (currentObj, parentKey = '') => {
        Object.keys(currentObj).forEach(key => {
            const currKey = parentKey ? `${parentKey}${separator}${key}` : key;
            const currVal = currentObj[key];
            if (Array.isArray(currVal) && currVal.length > 0) {
                currVal.forEach((val, i) => {
                    flatten(val, `${currKey}${separator}${i}`);
                });
            } else if (typeof currVal === 'object' && currVal !== null) {
                flatten(currVal, currKey);
            } else {
                result[currKey] = currVal;
            }
        });
    };

    flatten(obj);

    return result;
}

const jsonData = {
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

console.log(flattenKeys(jsonData));
