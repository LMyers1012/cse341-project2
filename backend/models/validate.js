const validate = require('../helpers/validate');

// function dateIsValid(date) {
//   return Date.parse(date);
// }

// function stringIsValid(string) {
//   if (string == null || string == '') {
//     return false;
//   } else {
//     return true;
//   }
// }

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
    beltLevel: 'required|email',
    birthday: 'required|string',
    style: 'required|array',
    strengths: 'required|array',
    classes: 'required|array',
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
