const mongodb = require('../db/connect');
const validate = require('../models/input_validation');
const ObjectId = require('mongodb').ObjectId;

// Get entire list of students from mongodb
async function getAllStudents(req, res, next) {
  try {
    const result = await mongodb.getDb().db().collection('students').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get a single student by id
const getStudentById = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('students')
      .find({ _id: ObjectId(req.params.id) });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new student
const createNewStudent = async (req, res, next) => {
  try {
    if (
      validate.stringIsValid(req.body.firstName) &&
      validate.stringIsValid(req.body.lastName) &&
      validate.dateIsValid(req.body.birthday) &&
      validate.stringIsValid(req.body.beltLevel) &&
      validate.stringIsValid(req.body.classGroup) &&
      validate.stringIsValid(req.body.instructor) &&
      validate.stringIsValid(req.body.parentFirstName) &&
      validate.stringIsValid(req.body.parentLastName)
    ) {
      const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        beltLevel: req.body.beltLevel,
        classGroup: req.body.classGroup,
        instructor: req.body.instructor,
        parentFirstName: req.body.parentFirstName,
        parentLastName: req.body.parentLastName,
      };

      const response = await mongodb
        .getDb()
        .db()
        .collection('students')
        .insertOne(student);
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

// Update one student by Id
const updateStudent = async (req, res, next) => {
  try {
    if (
      validate.stringIsValid(req.body.firstName) &&
      validate.stringIsValid(req.body.lastName) &&
      validate.dateIsValid(req.body.birthday) &&
      validate.stringIsValid(req.body.beltLevel) &&
      validate.stringIsValid(req.body.classGroup) &&
      validate.stringIsValid(req.body.instructor) &&
      validate.stringIsValid(req.body.parentFirstName) &&
      validate.stringIsValid(req.body.parentLastName)
    ) {
      const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        beltLevel: req.body.beltLevel,
        classGroup: req.body.classGroup,
        instructor: req.body.instructor,
        parentFirstName: req.body.parentFirstName,
        parentLastName: req.body.parentLastName,
      };

      const response = await mongodb
        .getDb()
        .db()
        .collection('students')
        .replaceOne({ _id: ObjectId(req.params.id) }, student);
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

// Delete one student by Id
const deleteStudentById = async (req, res, next) => {
  try {
    const response = await mongodb
      .getDb()
      .db()
      .collection('students')
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

// Export the functions
module.exports = {
  getAllStudents,
  getStudentById,
  createNewStudent,
  updateStudent,
  deleteStudentById,
};
