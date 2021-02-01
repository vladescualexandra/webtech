function textProcessor(input, tokens){

    if (typeof(input) !== 'string') {
        throw 'Input should be a string';
    } else if (input.length < 6) {
        throw 'Input should have at least 6 characters';
    } else if (!Array.isArray(tokens)) {
        throw 'Invalid array format';
    } else {
        for (let item of tokens) {
            if (!item.hasOwnProperty('tokenName') || !item.hasOwnProperty('tokenValue')) {
                throw 'Invalid array format';
            }
        }

        if (!input.includes('${')) {
            return input;
        } else {

            for (let item of tokens) {
                input = input.replace(item.tokenName, item.tokenValue);
                input = input.replace('${', '');
                input = input.replace('}', '');
            }

            return input;
        }
    }

}

const app = {
    textProcessor: textProcessor
};

module.exports = app;