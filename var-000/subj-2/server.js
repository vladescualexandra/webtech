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
.then(async (connection) => {
	conn = connection
	await connection.query('CREATE DATABASE IF NOT EXISTS tw_exam')
})
.catch((err) => {
	console.warn(err.stack)
}).then(() => {
	// return conn.end()
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
				address : 'some address on ' + i + 'th street'
			})
			await author.save()
		}
		res.status(201).json({message : 'created'})
	}
	catch(err){
		console.warn(err.stack)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/authors', async (req, res) => {
	// should get all authors
	try{
		let authors = await Author.findAll()
		res.status(200).json(authors)
	}
	catch(err){
		// console.warn(err.stack)
		res.status(500).json({message : 'server error'})		
	}
})

app.post('/authors',  async (req, res) => {
	const matcher_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	// TODO: implementați funcția
	// ar trebui să adauge un autor
	// numele și email-ul autorului nu pot fi vide
	// adresele autorilor pot fi vide
	// email-urile autorilor trebuie validate ca formă
	
	try{

		let name = req.body.name;
		let email = req.body.email;
		let adress = req.body.adress;

		if (name == null 
			|| name.length === 0 
			|| email === null 
			|| email.length === 0
			|| !matcher_email.test(email.toLowerCase())) {

				res.status(500).send({message: 'server error'});
			} else {
				await Author.create(req.body);
				res.status(201).send({message: 'created'});
			}
	}
	catch(err){
		res.status(500).json({message : 'server error'})		
	}

})

app.listen(8080)

module.exports = app