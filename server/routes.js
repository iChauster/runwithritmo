const users = require('./controllers/users')
const express = require('express')

module.exports = function(app, passport){
	
	app.get('/check', users.check)

	app.post('/login', users.login);

	app.post('/register', users.register);

	app.post('/logout', users.logout);

}