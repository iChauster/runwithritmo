const User = require('../models/user')
const Run = require('../models/run')
const passport = require('passport')
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId;


module.exports = {};

module.exports.register = function (req, res){
	
	if(!req.body.username || !req.body.password)
		return res.status(400).end('Invalid');

	User.findOne({ username:  req.body.username }, function(err, user) {
        if (user) {
            return res.status(400).end('User already exists');
        } else {

            var newUser = new User();
            newUser.name = req.body.name;
            newUser.username = req.body.username;
            newUser.password = newUser.generateHash(req.body.password);
            newUser.runs = []

            newUser.save();

            res.writeHead(200, {"Content-Type": "application/json"});

            newUser = newUser.toObject();
            delete newUser.password;
            res.end(JSON.stringify(newUser));
        }
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
			if(err){
				return next(err)
			}else{
				user.populate('runs', function (err, u){
					if(err){
						return next(err)
					}else{
						console.log(u)
						return res.json({MESSAGE : "SUCCESS", "USER" : u})
					}
				});
			}
		})
	})(req,res,next)
}
module.exports.postRun = function (req, res, next){
	console.log('adding run');
	console.log(req.user);
	console.log(req.body.length);
	if(req.user && req.body.length){
		var r = new Run({length : parseInt(req.body.length), subpoints : [{longitude : parseFloat(req.body.long), latitude : parseFloat(req.body.lat)}], pace : req.body.pace, time : req.body.time, date: Date()});
		r.save(function (err){
			if(err){
				console.log(err)
			}else{
				var id = ObjectId(r["_id"])
				console.log(mongoose.Types.ObjectId.isValid(id));
				User.findById(req.user.id, function(err, user) {
					if (user) {
						var array = user.runs
						array.push(id);
						user.runs = array
						user.save(function (err) { 
							if(err) {
								console.log(err);
							}
						});

						res.writeHead(200, {"Content-Type": "application/json"});
						user = user.toObject();
						res.end(JSON.stringify(user));
					} else {
						res.status(400).json({MESSAGE : "NO LOGIN"});
					}
				});
			}
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
		console.log('runs :')
		console.log(req.user.runs)
		return res.json({MESSAGE : "LOGGED IN", "USER" : req.user})

	}
}
module.exports.searchUsername = function (req, res, next){
	if(req.user){
		User.findOne({username : req.params.username}, function (err, user){
			if (user) {
				user.populate('runs', function (err, u){
					if(err){
						return next(err)
					}else{
						console.log(u)
						return res.json({MESSAGE : "SUCCESS", "USER" : u})
					}
				});
        	} else {
            	return res.status(400).end('User not found');
        	}
		})
	}else{
		console.log('needs login');
		return res.status(321).json({MESSAGE : "NEEDS LOGIN"});
	}
}
module.exports.logout = function (req, res, next){
	req.logout();
	res.end('LOGGED OUT');
}