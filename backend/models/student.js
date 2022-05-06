// const mongoose = require('mongoose');

// module.exports = (mongoose) => {
//   const Student = mongoose.model(
//     'students',
//     mongoose.Schema({
//       firstName: { type: String },
//       lastName: { type: String },
//       birthday: { type: String },
//       beltLevel: { type: String },
//       classGroup: { type: String },
//       instructor: { type: String },
//       parentFirstName: { type: String },
//       parentLastName: { type: String },
//     })
//   );

//   return Student;
// };

const Joi = require('joi');
const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthday: Joi.string().required(),
  beltLevel: Joi.string().required(),
  classGroup: Joi.string().required(),
  instructor: Joi.string().required(),
  parentFirstName: Joi.string().required(),
  parentLastName: Joi.string().required(),
});

module.exports = mongoose.model('students', StudentSchema);
