const { ObjectId } = require('mongodb');
const db = require('../models');
const Instructor = db.instructor;

const getAllInstructors = async (req, res, next) => {
  // #swagger.tags = ['Instructor']
  try {
    Instructor.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving instructors.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getInstructorById = (req, res) => {
  // #swagger.tags = ['Instructor']
  const instructorId = ObjectId(req.params.instructorid);
  Instructor.find({ _id: instructorId })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: 'No instructor found with id: ' + instructorId });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving instructor with id=' + instructorId,
        error: err,
      });
    });
};

const createNewInstructor = (req, res) => {
  // #swagger.tags = ['Instructor']
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.birthday ||
      !req.body.beltLevel ||
      !req.body.style ||
      !req.body.classes ||
      !req.body.isTeaching
    ) {
      res.status(400).send({ message: 'Content cannot be empty.' });
      return;
    }
    const instructor = new Instructor(req.body);
    instructor
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'An error occurred while creating the instructor.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateInstructorById = async (req, res) => {
  // #swagger.tags = ['Instructor']
  try {
    const instructorId = ObjectId(req.params.instructorid);
    if (!instructorId) {
      res.status(400).send({ message: 'Invalid instructor ID supplied.' });
      return;
    }
    Instructor.findOne({ _id: instructorId }, function (err, instructor) {
      instructor.firstName = req.body.firstName;
      instructor.lastName = req.body.lastName;
      instructor.birthday = req.body.birthday;
      instructor.beltLevel = req.body.beltLevel;
      instructor.style = req.body.style;
      instructor.classes = req.body.classes;
      instructor.isTeaching = req.body.isTeaching;
      instructor.save(function (err) {
        if (err) {
          res
            .status(500)
            .json(err || 'An error occurred while updating the instructor.');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteInstructorById = async (req, res) => {
  // #swagger.tags = ['Instructor']
  try {
    const instructorId = ObjectId(req.params.instructorid);
    if (!instructorId) {
      res.status(400).send({ message: 'Invalid instructor ID supplied.' });
      return;
    }
    Instructor.deleteOne({ _id: instructorId }, function (err, result) {
      if (err) {
        res
          .status(500)
          .json(err || 'An error occurred while deleting the instructor.');
      } else {
        res.status(204).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllInstructors,
  getInstructorById,
  createNewInstructor,
  updateInstructorById,
  deleteInstructorById,
};
