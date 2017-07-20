const User = require('../models/user')
const passport = require('passport')

module.exports = {};

module.exports.register = function (req, res){
	
	if(!req.body.username || !req.body.password)
		return res.status(400).end('Invalid');

	User.register(new User({username : req.body.username, runs : [], name : ""}), req.body.password, function(err, account){
		console.log(err)
		res.writeHead(200, {"Content-Type" : "application/json"})
		res.end(JSON.stringify(account));
	});
};

module.exports.login = function (req, res, next){
	console.log("REQUEST MADE");
	passport.authenticate('local', function (err, user, info){
		if(err)
			return next(err);
		if(!user){
			return res.status(400).json({MESSAGE : "INCORRECT CREDENTIALS"});
		}
		req.logIn(user, function (err){
			console.log(user);
			if(err){
				return next(err)
			}else{
				return res.json({MESSAGE : "SUCCESS", "USER" : user}) 
			}
		})
	})(req,res,next)
}
module.exports.postRun = function (req, res, next){
	console.log('adding run');
	console.log(req.user);
	console.log(req.body.length);
	if(req.user && req.body.length){
		User.findOneAndUpdate({username : req.user.username}, 
		{
			$push:{
				runs:{
					length : parseInt(req.body.length), subpoints : [{longitude : parseFloat(req.body.long), latitude : parseFloat(req.body.lat)}], pace : req.body.pace, time : req.body.time, date: Date()
				}
			}
		},
		function (err, numberAffected, raw){
			if(err){
				console.log(err);
			}
			console.log(numberAffected);
		});
	}else{
		res.status(400).json({MESSAGE : "NO LOGIN"});
	}
}
module.exports.check = function (req, res, next){
	console.log('CHECKING');
	if(!req.user){
		console.log('needs login');
		return res.status(321).json({MESSAGE : "NEEDS LOGIN"});
	}else{
		console.log('user in');
		return res.json({MESSAGE : "LOGGED IN", "USER" : req.user})

	}
}
module.exports.logout = function (req, res, next){
	req.logout();
	res.end('LOGGED OUT');
}