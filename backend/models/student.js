const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthday: String,
  beltLevel: String,
  classGroup: String,
  instructor: [String],
  parentName: [String],
});

module.exports = mongoose.model('students', studentSchema);
