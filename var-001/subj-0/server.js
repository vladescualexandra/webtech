const express = require("express")

const app = express()
app.use('/', express.static('public'))

app.listen(8080);

app.get('/article.json', async (req, res) => {

    let response = await fetch('/article.json');
    let data = await response.json();

    res.status(200).send(data);

});

module.exports = app;