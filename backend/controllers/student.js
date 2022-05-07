const read = require('body-parser/lib/read');
const { ObjectId } = require('mongodb');
const db = require('../models');
const Student = db.student;

const getAllStudents = async (req, res, next) => {
  // #swagger.tags = ['Student']
  try {
    Student.find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'An error occurred while retrieving students.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getStudent = (req, res) => {
  // #swagger.tags = ['Student']
  const studentId = ObjectId(req.params.studentid);
  Student.find({ _id: studentId })
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: 'No student found with id: ' + studentId });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving student with id=' + studentId,
        error: err,
      });
    });
};

const createNewStudent = (req, res) => {
  // #swagger.tags = ['Student']
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.birthday ||
      !req.body.beltLevel ||
      !req.body.parentName
    ) {
      res.status(400).send({ message: 'Content cannot be empty.' });
      return;
    }
    const student = new Student(req.body);
    student
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'An error occurred while creating the student.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateStudentById = async (req, res) => {
  // #swagger.tags = ['Student']
  try {
    const studentId = ObjectId(req.params.studentid);
    if (!studentId) {
      res.status(400).send({ message: 'Invalid student ID supplied.' });
      return;
    }
    Student.findOne({ _id: studentId }, function (err, student) {
      student.firstName = req.body.firstName;
      student.lastName = req.body.lastName;
      student.birthday = req.body.birthday;
      student.beltLevel = req.body.beltLevel;
      student.classGroup = req.body.classGroup;
      student.instructor = req.body.instructor;
      student.parentName = req.body.parentName;
      student.save(function (err) {
        if (err) {
          res
            .status(500)
            .json(err || 'An error occurred while updating the student.');
        } else {
          res.status(204).send();
        }
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteStudentById = async (req, res) => {
  // #swagger.tags = ['Student']
  try {
    const studentId = ObjectId(req.params.studentid);
    if (!studentId) {
      res.status(400).send({ message: 'Invalid student ID supplied.' });
      return;
    }
    Student.deleteOne({ _id: studentId }, function (err, result) {
      if (err) {
        res
          .status(500)
          .json(err || 'An error occurred while deleting the student.');
      } else {
        res.status(204).send(result);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllStudents,
  getStudent,
  createNewStudent,
  updateStudentById,
  deleteStudentById,
};
