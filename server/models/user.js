const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const md5 = require('MD5');
const run = require('./run');
const passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    runs : [{type: mongoose.Schema.Types.ObjectId, ref: 'Run'}],
    name : String
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', userSchema);