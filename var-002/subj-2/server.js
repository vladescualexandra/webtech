const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const mysql = require('mysql2/promise')

const DB_USERNAME = 'root'
const DB_PASSWORD = 'pass'
let conn;

mysql.createConnection({
	user : DB_USERNAME,
	password : DB_PASSWORD
})
.then(async (connection) => {
	conn = connection
	return await connection.query('CREATE DATABASE IF NOT EXISTS tw_exam')
}).then(() => {
	return conn.end()
})
.catch((err) => {
	console.warn(err.stack)
})

const sequelize = new Sequelize('tw_exam', DB_USERNAME, DB_PASSWORD,{
	dialect : 'mysql',
	logging: false
})

let Author = sequelize.define('author', {
	name : Sequelize.STRING,
	email : Sequelize.STRING,
	address : Sequelize.STRING,
	age : Sequelize.INTEGER
},{
	timestamps : false
})




const app = express()
app.use(bodyParser.json())

app.get('/create', async (req, res) => {
	try{
		await sequelize.sync({force : true})
		for (let i = 0; i < 10; i++){
			let author = new Author({
				name : 'name ' + i,
				email : 'name' + i + '@nowhere.com',
				address : 'some address on ' + i + 'th street',
				age : 30 + i
			})
			await author.save()
		}
		console.warn('CREATED')
		res.status(201).json({message : 'created'})
	}
	catch(err){
		console.warn(err.stack)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/authors', async (req, res) => {
	try{
		let authors = await Author.findAll()
		res.status(200).json(authors)
	}
	catch(err){
		// console.warn(err.stack)
		res.status(500).json({message : 'server error'})		
	}
})

app.post('/authors', async (req, res) => {
	try{
		let author = new Author(req.body)
		await author.save()
		res.status(201).json({message : 'created'})
	}
	catch(err){
		// console.warn(err.stack)
		res.status(500).json({message : 'server error'})		
	}
})

app.put('/authors/:id', async (req, res) => {
	// TODO: implementați funcția
	// adăugați o metoda pentru modificarea autorului
	// un autor inexistent nu poate fi modificat
	// numai câmpurile care sunt definite in request trebuie actualizate

	try {
		let author = await Author.findByPk(req.params.id);
		if (author === null) {
			res.status(404).send({message: 'not found'});
		} else {
			for (let prop in req.body) {
				author.prop = req.body.prop;
			}
			res.status(202).send({message: 'accepted'});
		}

	} catch(err) {
		res.status(500).json({message : 'server error'});
	}

})

app.delete('/authors/:id', async (req, res) => {
	// TODO: implementați funcția
	// adaugați o funcție pentru ștergerea unui autor
	// un autor inexistent nu poate fi șters

})

app.listen(8080)

module.exports = app