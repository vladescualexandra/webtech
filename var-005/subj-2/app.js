const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.locals.cars = [
    {
        make: "BMW",
        model: "X6",
        price: 50000
    },
    {
        make: "Lamborghini",
        model: "Huracan",
        price: 200000
    },
];

app.get('/cars', (req, res) => {
    res.status(200).json(app.locals.cars);
});

app.post('/cars', (req, res, next) => {

    try {
        if (JSON.stringify(req.body) === JSON.stringify({})) {
            res.status(500).json({message: 'Body is missing'});
        } else if (!req.body.hasOwnProperty('make')
                || !req.body.hasOwnProperty('model')
                || !req.body.hasOwnProperty('price')
                || typeof(req.body.make) !== 'string'
                || typeof(req.body.model) !== 'string'
                || typeof(req.body.price) !== 'number') {

                res.status(500).json({message: 'Invalid body format'});
        } else if (req.body.price < 0) {
            res.status(500).json({message: 'Price should be a positive number'});
        } else {
            let status = false;
            for (let item of app.locals.cars) {
                if (item.model === req.body.model) {
                    status = true;
                    break;
                }
            }

            if (status) {
                res.status(500).json({message: 'Car already exists'});
            } else {
                app.locals.cars.push({
                    make: req.body.make,
                    model: req.body.model,
                    price: parseInt(req.body.price)
                });
                next(
                    app.locals.cars.push({
                        make: req.body.make,
                        model: req.body.model,
                        price: req.body.price
                    })
                );
                res.status(201).json({message: 'Created'});
            } 
        }
    } catch(err) {
        res.status(400).json({message: 'Bad request'});
    }
});

module.exports = app;