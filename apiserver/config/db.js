var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = Promise;
var mongoUri = 'mongodb://localhost/secretsanta';

// Connect Mongoose to our local MongoDB via URI specified above and export it below
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', console.log.bind(console, 'Connected to mongoDB'));

module.exports = db;
