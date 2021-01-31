function removeOrderItem(orderInfo, position){
    if (!Array.isArray(orderInfo.items)) {
        throw 'Items should be an array';
    } else {
        for (let item of orderInfo.items) {
            if (!item.hasOwnProperty('price')
                || !item.hasOwnProperty('quantity')) {
                throw 'Malformed item';
            }
        }
        
        if (position < 0 || position > orderInfo.items.length) {
                throw 'Invalid position';
        } else {
                orderInfo.total = orderInfo.total 
                        - orderInfo.items[position].price * orderInfo.items[position].quantity;
                orderInfo.items.splice(position, 1);
                return orderInfo;
        }
    }
}

const app = {
    removeOrderItem
};

module.exports = app;