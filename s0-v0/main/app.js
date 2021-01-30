const express = require('express')

const app = express()

app.get('/cars', (req, res) => {
    res.status(200).json([{
        name :  'a',
        color : 'red'
    },{
        name :  'b',
        color : 'blue'
    }])
})

module.exports = app