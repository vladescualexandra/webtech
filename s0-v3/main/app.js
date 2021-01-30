const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require("node-fetch");
const fs = require('fs');


const app = express();
app.use(express.static('public'))

app.use(cors());


app.get('/data', async function (req, res) {
    fs.readFile('./data.json', 'utf8', function(err, data) {
        res.send(data)
    })
});

app.delete('/data/:name', async function (req, res) {
    let name = req.params.name;
    fs.readFile('./data.json', 'utf8', function(err, data) {
        let result = JSON.parse(data);
        for (let item of result) {
            if (item.name === name) {
                result.splice(result.indexOf(item), 1);
            } 
        }
        res.send(result)
    })
});

module.exports = app;