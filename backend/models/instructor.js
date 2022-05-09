// const { boolean } = require('joi');

module.exports = (mongoose) => {
  const Instructor = mongoose.model(
    'instructors',
    mongoose.Schema({
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      birthday: {
        type: String,
      },
      beltLevel: {
        type: String,
      },
      style: {
        type: [String],
      },
      isTeaching: {
        type: Boolean,
      },
      classes: {
        type: [String],
      },
    })
  );

  return Instructor;
};
