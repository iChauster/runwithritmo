var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Run = new Schema({
	length : Double,
	subpoints : [{longitude : Double, latitude : Double}],
	pace : String,
	time : String,
	date: Date
});

module.exports = mongoose.model('Run', Run);