const Joi = require('joi');

const userValidSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

const instructorValidSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthday: Joi.string().required(),
  beltLevel: Joi.string().required(),
  style: Joi.array().items(Joi.string).required(),
  strengths: Joi.array().items(Joi.string()),
  classes: Joi.array().items(Joi.string()),
});

const studentValidSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthday: Joi.string().required(),
  beltLevel: Joi.string().required(),
  classGroup: Joi.string().required(),
  instructor: Joi.string(),
  parentFirstName: Joi.string().required(),
  parentLastName: Joi.string().required(),
});

module.exports = { userValidSchema, instructorValidSchema, studentValidSchema };
