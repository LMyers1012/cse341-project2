module.exports = (mongoose) => {
  const userSchema = mongoose.model(
    'user',
    mongoose.Schema({
      email: { type: String },
      password: { type: String },
    })
  );

  return userSchema;
};
