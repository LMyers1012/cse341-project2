// const db = require('../models');
// const User = db.user;
const UserSchema = require('../models/user');
const passwordUtil = require('../helpers/passwordComplexity');
const mongoose = require('mongoose');
const { userValidSchema } = require('../helpers/validate');

const getAllUsers = async (req, res) => {
  // #swagger.tags = ['User']
  console.log('getting all users');
  try {
    UserSchema.find()
      .then((data) => {
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

  // try {
  //   const request = await UserSchema.find();
  //   console.log(request);
  //   res.json(request);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
};

const getUserByName = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    const username = req.params.username;
    User.find({ username: username })
      .then((data) => {
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

const createNewUser = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
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

const updateUser = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
      return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    User.findOne({ username: username }, function (err, user) {
      user.username = req.params.username;
      user.password = req.body.password;
      user.displayName = req.body.displayName;
      user.info = req.body.info;
      user.profile = req.body.profile;
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

const deleteUser = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    const username = req.params.username;
    if (!username) {
      res.status(400).send({ message: 'Invalid Username Supplied' });
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

module.exports = {
  getAllUsers,
  getUserByName,
  createNewUser,
  updateUser,
  deleteUser,
};
