const LocalStrat = require('passport-local').Strategy
const User = require('../models/user')

module.exports = function(passport){

	passport.serializeUser(User.serializeUser());

	passport.deserializeUser(User.deserializeUser());

	passport.use(new LocalStrat(function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    	}
    ));
}