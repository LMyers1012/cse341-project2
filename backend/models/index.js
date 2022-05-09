const dbConfig = require('../db/config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require('./user.js');
db.student = require('./student.js');
db.instructor = require('./instructor.js');

module.exports = db;
