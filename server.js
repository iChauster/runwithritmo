const express = require("express");
const fs = require("fs");
const mongoose = require('mongoose')
const passport = require('passport')
const sqlite = require("sql.js");
const URI = "mongodb://ichauster:straightup@ds151820.mlab.com:51820/runwithritmo"
const app = express();

mongoose.connect(URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('connection success');
});

require('./server/config/express')(app,passport)
require('./server/routes')(app,passport)
require('./server/config/passport')(passport)
app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
