const dbConfig = require('../db/connect');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require('./user.js')(mongoose);
db.student = require('./student.js')(mongoose);
db.instructor = require('./instructor.js')(mongoose);

module.exports = db;
