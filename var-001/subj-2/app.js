const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.locals.products = [
    {
        name: "Iphone XS",
        category: "Smartphone",
        price: 5000
    },
    {
        name: "Samsung Galaxy S10",
        category: "Smartphone",
        price: 3000
    },
    {
        name: "Huawei Mate 20 Pro",
        category: "Smartphone",
        price: 3500
    }
];

app.get('/products', (req, res) => {
    res.status(200).json(app.locals.products);
});

app.post('/products', (req, res, next) => {

    try {

        if (JSON.stringify(req.body) === JSON.stringify({})) {
            res.status(500).json({message: 'Body is missing'});
        } else if (!req.body.hasOwnProperty('name')
            || !req.body.hasOwnProperty('category')
            || !req.body.hasOwnProperty('price')) {

            res.status(500).send({message: 'Invalid body format'});
        } else if (req.body.price <= 0) {
            res.status(500).send({message: 'Price should be a positive number'});
        } else {

            let status = false;
            for (let item of app.locals.products) {
                if (item.name === req.body.name) {
                    status = true;
                    break;
                }
            }

            if (status) {
                res.status(500).send({message: 'Product already exists'});
            } else {
                console.log("aiciii");
                app.locals.products.push(req.body);
                res.status(201).send({message: 'Created'});
            }
        }


    } catch(err) {
        res.status(400).json({message: 'Bad request'});
    }

})

module.exports = app;