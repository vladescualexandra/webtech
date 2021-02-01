const express = require('express')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())

app.locals.cars = [{
    brand : 'Ferrari',
    make : 'Testarosa',
    year : 1984
},{
    brand : 'Ferrari',
    make : '250 GT California',
    year : 1957
}]

app.get('/cars', async (req, res) => {
    try {
        if (req.query.filter !== undefined) {
            let cars = [];
            for (let item of app.locals.cars) {
                if (item.brand.includes(req.query.filter)
                    || item.make.includes(req.query.filter)) {
                        cars.push(item);
                    }
            }
            res.status(200).json(cars);
        } else {
            res.status(200).json(app.locals.cars);
        }
    } catch (err) {
        res.status(500).send({message: 'server error'});
    }

})

app.post('/cars', async (req, res) => {
    try {
        
        if (req.body === undefined || JSON.stringify(req.body) === JSON.stringify({})) {
            res.status(400).json({message: 'body is missing'});
        } else if (!req.body.hasOwnProperty('brand')
                    || !req.body.hasOwnProperty('make')
                    || !req.body.hasOwnProperty('year')) {
                        res.status(400).send({message: 'malformed request'});
        } else if (req.body.year < 1860) {
            res.status(400).send({message: 'year should be > 1860'});
        } else {
            app.locals.cars.push(req.body);
            res.status(201).json({message: 'created'});
        }

    } catch (err) {
        res.status(500).send({message: 'server error'});
    }
})

module.exports = app