var mongoose = require('mongoose')
var Run = mongoose.Schema({
	length : Number,
	subpoints : [{longitude : Number, latitude : Number}],
	pace : String,
	time : String,
	date: Date
});

module.exports = mongoose.model('Run', Run);