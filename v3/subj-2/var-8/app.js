const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.locals.students = [
    {
        name: "Gigel",
        surname: "Popel",
        age: 23
    },
    {
        name: "Gigescu",
        surname: "Ionel",
        age: 25
    }
];

app.get('/students', (req, res) => {
    res.status(200).json(app.locals.products);
});

app.post('/students', (req, res, next) => {

    try {

        if (JSON.stringify(req.body) === JSON.stringify({})) {
            res.status(500).json({message: 'Body is missing'});
        } else if (
            !req.body.hasOwnProperty('name')
            || !req.body.hasOwnProperty('surname')
            || !req.body.hasOwnProperty('age')
            || typeof(req.body.name) !== 'string'
            || typeof(req.body.surname) !== 'string'
            || typeof(req.body.age) !== 'number'
        ) {
            res.status(500).json({message: 'Invalid body format'});
        } else if(req.body.age < 0) {
            res.status(500).json({message: 'Age should be a positive number'});
        } else {
            let status = false;
            for (let item of app.locals.students) {
                if (item.name === req.body.name) {
                    status = true;
                    break;
                }
            }

            if (status) {
                res.status(500).json({message: 'Student already exists'});
            } else {
                app.locals.students.push({
                    name: req.body.name,
                    surname: req.body.surname,
                    age: req.body.age
                });
                res.status(201).json({message: 'Created'});
            }
        }


    } catch(err) {
        res.status(400).json({message: 'Bad request'});
    }
})

module.exports = app;