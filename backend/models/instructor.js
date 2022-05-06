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
const Joi = require('joi');
const mongoose = require('mongoose');

const InstructorSchema = mongoose.Schema({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthday: Joi.string().required(),
  beltLevel: Joi.string().required(),
  style: Joi.string().required(),
  strengths: Joi.string().required(),
  classes: Joi.string().required(),
});

module.exports = mongoose.model('instructors', InstructorSchema);
