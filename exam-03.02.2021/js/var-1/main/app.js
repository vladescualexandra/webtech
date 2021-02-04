function calculateFrequencies(input, dictionary){

    if (typeof(input) !== 'string') {
        throw 'Input should be a string';
    } else if (!Array.isArray(dictionary)) {
        throw 'Invalid dictionary format';
    } else {
        for (let item of dictionary) {
            if (typeof(item) !== 'string') {
                throw 'Invalid dictionary format';
            }
        }

        let words = [];
        for (let item of input.split(" ")) {
            let lc_item = item.toLowerCase();
            if (!dictionary.includes(lc_item)) {
                words.push(lc_item);
            }
        }

        let number_of_words = words.length;

        let result = {};
        for (let item of words) {
            let fr = 1 / number_of_words;
            result[item] = fr;
        }

        return result;
    }
}

const app = {
    calculateFrequencies
};

module.exports = app;