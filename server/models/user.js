const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const md5 = require('MD5');
const run = require('./run');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    runs : [run],
    name : String
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);