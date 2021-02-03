const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const mysql = require('mysql2/promise')

const DB_USERNAME = 'root'
const DB_PASSWORD = 'pass'

mysql.createConnection({
	user : DB_USERNAME,
	password : DB_PASSWORD
})
.then(async (connection) => {
	await connection.query('CREATE DATABASE IF NOT EXISTS tw_exam')
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
	// TODO: implementați funcția
	// ar trebui să listeze toate cărțile unui autor
	// ar trebui să permită filtrare bazată pe adresă și email 
	// (filterele se numesc address și email și sunt trimise ca query parameters)
	
	try{
		
		if (req.query.address !== undefined
			&& req.query.address.length !== 0 
			&& req.query.email === undefined) {
			let authors = await Author.findAll({
				where: {
					address: req.query.address
				}
			});
		} else if (req.query.address === undefined 
					&& req.query.email !== undefined
					&& req.query.email.length !== 0) {
			let authors = await Author.findAll({
				where: {
					email: req.query.email
				}
			});
		} else if (req.query.address !== undefined 
					&& req.query.email !== undefined
					&& req.query.address.length !== 0
					&& req.query.email.length !== 0) {
			let authors = await Author.findAll({
				where: {
					address: req.query.address,
					email: req.query.email
				}
			});
		} else {
			let authors = await Author.findAll();
		}

		res.status(200).send(authors);
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

app.listen(8080)

module.exports = app