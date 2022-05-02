function dateIsValid(date) {
  return Date.parse(date);
}

function stringIsValid(string) {
  if (string == null || string == '') {
    return false;
  } else {
    return true;
  }
}

module.exports = { dateIsValid, stringIsValid };
