module.exports = (mongoose) => {
  const Student = mongoose.model(
    'students',
    mongoose.Schema({
      firstName: { type: String },
      lastName: { type: String },
      birthday: { type: String },
      beltLevel: { type: String },
      classGroup: { type: String },
      instructor: { type: String },
      parentFirstName: { type: String },
      parentLastName: { type: String },
    })
  );

  return Student;
};
