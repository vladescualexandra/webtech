function bowdlerize(input, dictionary){

    if (typeof(input) !== 'string') {
        throw 'Input should be a string';
    } else {
        if (!Array.isArray(dictionary)) {
            throw 'Invalid dictionary format';
        } else {
            for (let item of dictionary) {
                if (typeof(item) !== 'string') {
                    throw 'Invalid dictionary format';
                }
            }

            let result = input;
            for (let item of dictionary) {
                if (input.toLowerCase()
                        .includes(item.toLowerCase())) {
                    let converted = item.substring(0, 1) 
                                    + "*".repeat(item.length - 2) 
                                    + item.substring(item.length - 1);
                    result = result.replace(item, converted);
                }
            }

            return result;
        }
    }

}

const app = {
    bowdlerize
};

module.exports = app;