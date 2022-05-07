const validate = require('../helpers/validate');

const saveStudent = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    birthday: 'required|string',
    beltLevel: 'required|string',
    classGroup: 'string',
    instructor: 'string',
    parentFirstName: 'required|string',
    parentLastName: 'required|string',
  };
  validate(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveInstructor = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    beltLevel: 'required|string',
    birthday: 'required|string',
    style: 'required|string',
    strengths: 'string',
    classes: 'string',
  };
  validate(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = { saveStudent, saveInstructor };
