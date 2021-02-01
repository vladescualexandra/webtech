const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const mysql = require('mysql2/promise')

const DB_USERNAME = 'root'
const DB_PASSWORD = 'pass'

let conn

mysql.createConnection({
    user : DB_USERNAME,
    password : DB_PASSWORD
})
.then((connection) => {
    conn = connection
    return connection.query('CREATE DATABASE IF NOT EXISTS tw_exam')
})
.then(() => {
    return conn.end()
})
.catch((err) => {
    console.warn(err.stack)
})

const sequelize = new Sequelize('tw_exam', DB_USERNAME, DB_PASSWORD,{
    dialect : 'mysql',
    logging: false
})

let Ship = sequelize.define('student', {
    name : Sequelize.STRING,
    portOfSail : Sequelize.STRING,
    displacement : Sequelize.INTEGER
},{
    timestamps : false
})


const app = express()
app.use(bodyParser.json())

app.get('/create', async (req, res) => {
    try{
        await sequelize.sync({force : true})
        for (let i = 0; i < 10; i++){
            let ship = new Ship({
                name : `name${i}`,
                portOfSail : `port ${i}`,
                displacement : 3000 + 10 * i
            })
            await ship.save()
        }
        res.status(201).json({message : 'created'})
    }
    catch(err){
        console.warn(err.stack)
        res.status(500).json({message : 'server error'})
    }
})

app.get('/ships', async (req, res) => {
    try {
        let pageNo = req.query.pageNo;
        let pageSize = req.query.pageSize;
        let ships = [];

        if (pageNo === undefined && pageSize === undefined) {
            ships = await Ship.findAll();
            res.status(200).send(ships);

        } else if (pageNo !== undefined && pageSize === undefined) {
            pageSize = 5;
            ships = await Ship.findAll({
                offset: pageNo * pageSize,
                limit: pageSize
            });
            res.status(200).send(ships);
        } else if (pageNo !== undefined && pageSize !== undefined) {
            try {
                pageNo = parseInt(pageNo);
                pageSize = parseInt(pageSize);

                ships = await Ship.findAll({
                    offset: pageNo * pageSize,
                    limit: pageSize
                });
                res.status(200).send(ships);
            } catch(err) {
                ships = await Ship.findAll();
                res.status(200).send(ships);
            }
        } else {
            ships = await Ship.findAll();
            res.status(200).send(ships);
        }

    } catch(err) {
		res.status(500).send({message : 'server error'})		
    }
})

app.post('/ships', async (req, res) => {
	try{
		let ship = new Ship(req.body)
		await ship.save()
		res.status(201).json({message : 'created'})
	}
	catch(err){
		res.status(500).json({message : 'server error'})		
	}
})

module.exports = app