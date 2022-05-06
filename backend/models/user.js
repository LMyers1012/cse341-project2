// module.exports = (mongoose) => {
//   const userSchema = mongoose.model(
//     'user',
//     mongoose.Schema({
//       email: { type: String },
//       password: { type: String },
//     })
//   );

//   return userSchema;
// };

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: { type: String },
  password: { type: String },
});

module.exports = mongoose.model('user', UserSchema);
