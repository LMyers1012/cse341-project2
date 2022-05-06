// module.exports = (mongoose) => {
//   const Instructor = mongoose.model(
//     'instructors',
//     mongoose.Schema({
//       firstName: { type: String },
//       lastName: { type: String },
//       birthday: { type: String },
//       beltLevel: { type: String },
//       style: { type: [String] },
//       strengths: { type: [String] },
//       classes: { type: [String] },
//     })
//   );

//   return Instructor;
// };

// const array = require(joi / lib / types / array);
const mongoose = require('mongoose');

const InstructorSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  birthday: { type: String },
  beltLevel: { type: String },
  style: { type: [String] },
  strengths: { type: [String] },
  classes: { type: [String] },
});

module.exports = mongoose.model('instructors', InstructorSchema);
