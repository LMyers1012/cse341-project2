const db = require('../models');
const User = db.user;
const checkPass = require('../helpers/passwordComplexityCheck');

const getAllUsers = (req, res) => {
  // #swagger.tags = ['User']
  try {
    User.find({})
      .then((data) => {
        data.forEach((user) => {
          user.password = obfuscate(user.password);
        });
        // console.log(data);
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserByName = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    const userExists = await User.findOne({ username: username });
    // if (userExists) console.log('userExists');
    if (!userExists) {
      res.status(400).send({ message: 'This username does not exist.' });
      return;
    }
    User.find({ username: username })
      .then((data) => {
        data.forEach((user) => {
          user.password = obfuscate(user.password);
        });
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving users.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewUser = (req, res) => {
  // #swagger.tags = ['User']
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: 'Content cannot be empty!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = checkPass.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    const user = new User(req.body);
    user
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the user.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUserByName = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: 'Content cannot be empty!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = checkPass.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    User.findOne({ username: username }, function (err, user) {
      user.username = req.body.username;
      user.password = req.body.password;
      user.save(function (err) {
        if (err) {
          res
            .status(500)
            .json(err || 'Some error occurred while updating the contact.');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUserByName = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    const username = req.params.username;
    // console.log(username);
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    const userExists = await User.findOne({ username: username });
    if (!userExists) {
      res.status(400).send({ message: 'This username does not exist.' });
      return;
    }
    User.deleteOne({ username: username }, function (err, result) {
      if (err) {
        res
          .status(500)
          .json(err || 'Some error occurred while deleting the contact.');
      } else {
        res.status(204).send(result);
      }
    });
  } catch (err) {
    res
      .status(500)
      .json(err || 'Some error occurred while deleting the contact.');
  }
};

function obfuscate(string) {
  // In the real world, I would obfuscate the entire password and
  // not leave the first two characters. I left them here intentionally
  // so you could tell that the password had been updated if you
  // so choose in the update functions.
  let stringLength = string.length;
  let firstTwo = string.substring(0, 2);
  let asteriskString = '';
  for (let i = 0; i < stringLength - 2; i++) {
    asteriskString += '*';
  }
  let obfuscatedString = firstTwo + asteriskString;
  return obfuscatedString;
}

module.exports = {
  getAllUsers,
  getUserByName,
  createNewUser,
  updateUserByName,
  deleteUserByName,
};
