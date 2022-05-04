const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get entire list of students from mongodb
async function getAllStudents(req, res, next) {
  try {
    mongodb
      .getDb()
      .db()
      .collection('students')
      .find()
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get a single student by id
const getStudentById = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  try {
    mongodb
      .getDb()
      .db()
      .collection('students')
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new student
const createNewStudent = async (req, res, next) => {
  try {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update one student by Id
const updateStudent = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  try {
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete one student by Id
const deleteStudentById = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
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
