class Queue {
    constructor() {
        this.items = [];
    }

    insert(element) {
        if (typeof(element) === 'string') {
            this.items.push(element);
        } else {
            throw 'Invalid Type';
        }
    }

    extract() {
        if (this.items.length === 0) {
            throw 'Invalid Operation';
        } else {
            let item = this.items.shift();
            return item;
        }
    }
  
}

module.exports = Queue;