function applyDiscount(vehicles, discount){
    if (typeof(discount) !== 'number') {
        return Promise.reject(new Error('Invalid discount'));
    } else if (!Array.isArray(vehicles)) {
        return Promise.reject(new Error('Invalid array format'));
    } else {
        for (let item of vehicles) {
            if (!item.hasOwnProperty('make')
                || !item.hasOwnProperty('price')
                || typeof(item.make) !== 'string'
                || typeof(item.price) !== 'number') {
                
                return Promise.reject(new Error('Invalid array format'));
            } 
        }

        let min = 0;
        for (let item of vehicles) {
            if (item.price < min) {
                min = item.price;
            }
        }

        if (discount > (0.5 * min)) {
            return Promise.reject('Discount too big');
        } else {
            for (let i=0; i< vehicles.length; i++) {
                let newPrice = vehicles[i].price - discount * vehicles[i].price;
                vehicles[i].price = newPrice;
            }
            return Promise.resolve(vehicles);
        }

    }
}

const app = {
    applyDiscount: applyDiscount
};

module.exports = app;