export const arraySlicer = (array, chunkLength) => {
    const result = [];
    const initialLength = array.length;
    if (initialLength <= chunkLength) {
        result.push(array);
    } else {
        const iterations = Math.floor(initialLength / chunkLength);
        for (let i = 0; i < iterations; i += 1) {
            result.push(array.splice(0, chunkLength));
        }
        if (array.length > 0) {
            result.push(array);
        }
    }
    return result;
}

export const filterItems = (arr, searchValue) => {
    // Here I'll go with O(n) and search the Name that start with.
    // This can operate well with much larger arrays than 6MB, personally tried with 300MB Json file.
    return arr.filter((obj) => {
        let found = false;
        Object.keys(obj).every((key) => {
            const viewObjectValue = obj[key];
            if (key !== 'countryName'
                && key !== 'countryCode'
                && key !== 'code'
                && key !== 'type'
                && String(viewObjectValue).toLowerCase().startsWith(searchValue.toLowerCase())
            ) {
                found = true;
                return false;
            }
            return true;
        });
        return found;
    });
}
