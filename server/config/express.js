const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const session = require('express-session')
module.exports = function(app,passport){
	
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended : true}));

	app.use(session({secret : 'secret key'}));
	app.use(passport.initialize());
	app.use(passport.session());

}