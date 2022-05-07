const passwordComplexity = require('joi-password-complexity');

const complexityOptions = {
  min: 8,
  max: 26,
  lowercase: 1,
  upperCase: 1,
  numberic: 1,
  symbol: 1,
  requirementCount: 4,
};

module.exports.passwordPass = (passwordToCheck) => {
  return passwordComplexity(complexityOptions, 'Password').validate(
    passwordToCheck
  );
};
