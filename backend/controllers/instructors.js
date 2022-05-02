const mongodb = require('../db/connect');
const validate = require('../models/input_validation');
const ObjectId = require('mongodb').ObjectId;

// Get entire list of instructors from mongodb
async function getAllInstructors(req, res, next) {
  try {
    const result = await mongodb.getDb().db().collection('instructors').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get a single instructor by id
const getInstructorById = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('instructors')
      .find({ _id: ObjectId(req.params.id) });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new instructor
const createNewInstructor = async (req, res, next) => {
  try {
    if (
      validate.stringIsValid(req.body.firstName) &&
      validate.stringIsValid(req.body.lastName) &&
      validate.dateIsValid(req.body.birthday) &&
      validate.stringIsValid(req.body.beltLevel) &&
      validate.stringIsValid(req.body.style) &&
      validate.stringIsValid(req.body.strengths) &&
      validate.stringIsValid(req.body.classes)
    ) {
      const instructor = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        beltLevel: req.body.birthday,
        birthday: req.body.beltLevel,
        style: req.body.style,
        strengths: req.body.strengths,
        classes: req.body.classes,
      };

      const response = await mongodb
        .getDb()
        .db()
        .collection('instructors')
        .insertOne(instructor);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res
          .status(500)
          .json(
            response.error || 'An error occurred while creating the contact.'
          );
      }
    } else {
      res.status(500).json('One or more data inputs is invalid.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update one instructor by Id
const updateInstructor = async (req, res, next) => {
  try {
    if (
      validate.stringIsValid(req.body.firstName) &&
      validate.stringIsValid(req.body.lastName) &&
      validate.dateIsValid(req.body.birthday) &&
      validate.stringIsValid(req.body.beltLevel) &&
      validate.stringIsValid(req.body.style) &&
      validate.stringIsValid(req.body.strengths) &&
      validate.stringIsValid(req.body.classes)
    ) {
      const instructor = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        beltLevel: req.body.birthday,
        birthday: req.body.beltLevel,
        style: req.body.style,
        strengths: req.body.strengths,
        classes: req.body.classes,
      };

      const response = await mongodb
        .getDb()
        .db()
        .collection('instructors')
        .replaceOne({ _id: ObjectId(req.params.id) }, instructor);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res
          .status(500)
          .json(
            response.error || 'An error occurred while updating the contact.'
          );
      }
    } else {
      res.status(500).json('One or more data inputs is invalid.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete one instructor by Id
const deleteInstructorById = async (req, res, next) => {
  try {
    const response = await mongodb
      .getDb()
      .db()
      .collection('instructors')
      .deleteOne({ _id: ObjectId(req.params.id) }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || 'An error occurred while deleting the contact.'
        );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllInstructors,
  getInstructorById,
  createNewInstructor,
  updateInstructor,
  deleteInstructorById,
};
