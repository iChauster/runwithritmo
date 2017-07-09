const User = require('../models/user')
const passport = require('passport')

module.exports = {};

module.exports.register = function (req, res){
	
	if(!req.body.name || !req.body.username || !req.body.password)
		return res.status(400).end('Invalid');

	User.findOne({username : req.body.username}, function (err, user){
		if(user){
			return res.status(400).end('User exists')
		}else{
			var retUser = new User();
			retUser.name = req.body.name;
			retUser.username = req.body.username;
			retUser.password = retUser.generateHash(req.body.password)

			retUser.save();

			res.writeHead(200, {"Content-Type" : "application/json"})

			retUser = retUser.toObject();

			delete retUser.password

			res.end(JSON.stringify(retUser));
		}
	});
};

module.exports.login = function (req, res, next){
	passport.authenticate('local', function (err, user, info){
		if(err)
			return next(err);
		if(!user){
			return res.status(400).json({MESSAGE : "INCORRECT CREDENTIALS"});
		}
		req.logIn(user, function (err){
			if(err){
				return next(err)
			}else{
				return res.json({MESSAGE : "SUCCESS"}) 
			}
		})
	})(req,res,next)
}

module.exports.logout = function (req, res, next){
	req.logout();
	res.end('LOGGED OUT');
}