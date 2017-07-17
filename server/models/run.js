var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Run = new Schema({
	length : Number,
	subpoints : [{longitude : Number, latitude : Number}],
	pace : String,
	time : String,
	date: Date
});

module.exports = mongoose.model('Run', Run);