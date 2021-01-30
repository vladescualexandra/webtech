function removeOrderItem(orderInfo, position){
    if (Array.isArray(orderInfo.items)) {
    
        for (let item of orderInfo.items) {
            if (!item.hasOwnProperty('price') || 
                    !item.hasOwnProperty('quantity')) {
                        throw 'Malformed item';
            }
        }

        if (position > 0 && position < orderInfo.items.length) {
            orderInfo.total = orderInfo.total - 
                orderInfo.items[position].price * orderInfo.items[position].quantity;
            orderInfo.items.splice(position, 1);
            return orderInfo;

        } else {
            throw 'Invalid position';
        }

    } else {
        throw 'Items should be an array';
    }
}

const app = {
    removeOrderItem
};

module.exports = app;