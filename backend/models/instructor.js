const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthday: String,
  beltLevel: String,
  style: [String],
  isTeaching: Boolean,
  classes: [String],
});

module.exports = mongoose.model('instructors', instructorSchema);
