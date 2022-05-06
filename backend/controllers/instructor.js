// const { ServerSession } = require('mongodb');
const db = require('../models');
const Instructor = db.instructor;
const ObjectId = require('mongodb').ObjectId;

const getAllInstructors = async (req, res, next) => {
  // #swagger.tags = ['Instructors']
  // try {
  //   Instructor.find({})
  //     .then((data) => {
  //       res.status(200).send(data);
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message:
  //           err.message || 'An error occurred while retrieving instructors.',
  //       });
  //     });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  console.log('getting all instructors');
  try {
    const request = await Instructor.find();
    res.json(request);
  } catch (err) {
    next(err);
  }
};

const getInstructorById = async (req, res, next) => {
  // #swagger.tags = ['Instructors']
  if (!ObjectId.isValid(req.params.instructorid)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  try {
    Instructor.findById(req.params.instructorid)
      .then((data) => {
        if (!data)
          res.status(404).send({
            message: 'No instructor found with id ' + req.params.instructorid,
          });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            'Error retrieving instructor with id ' + req.params.instructorid,
          error: err,
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewInstructor = async (req, res, next) => {
  // #swagger.tags = ['Instructors']
  try {
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.beltLevel ||
      !req.body.birthday ||
      !req.body.style ||
      !req.body.strengths ||
      !req.body.classes
    ) {
      res.status(400).send({ message: 'Content cannot be empty!' });
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

const updateInstructorById = async (req, res, next) => {
  // #swagger.tags = ['Instructors']
  if (!ObjectId.isValid(req.params.instructorid)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  try {
    Instructor.findOne(
      { _id: ObjectId(req.params.instructorid) },
      function (err, inst) {
        inst.firstName = req.body.firstName;
        inst.lastName = req.body.lastName;
        inst.birthday = req.body.birthday;
        inst.beltLevel = req.body.beltLevel;
        inst.style = req.body.style;
        inst.strengths = req.body.strengths;
        inst.classes = req.body.classes;
        inst.save(function (err) {
          if (err) {
            res
              .status(500)
              .json(err || 'An error occurred while updating the instructor.');
          } else {
            res.status(204).send();
          }
        });
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteInstructorById = async (req, res, next) => {
  // #swagger.tags = ['Instructors']
  if (!ObjectId.isValid(req.params.instructorid)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  try {
    Instructor.deleteOne(
      { _id: ObjectId(req.params.instructorid) },
      function (err, result) {
        if (err) {
          res
            .status(500)
            .json(err || 'An error occurred while deleting the instructor.');
        } else {
          res.status(204).send(result);
        }
      }
    );
  } catch (err) {
    res
      .status(500)
      .json(err || 'An error occurred while deleting the instructor.');
  }
};

module.exports = {
  getAllInstructors,
  getInstructorById,
  createNewInstructor,
  updateInstructorById,
  deleteInstructorById,
};

// // Get entire list of instructors from mongodb
// async function getAllInstructors(req, res, next) {
//   // #swagger.tags = ['Instructors']
//   try {
//     mongodb
//       .getDb()
//       .db()
//       .collection('instructors')
//       .find()
//       .toArray((err, lists) => {
//         if (err) {
//           res.status(400).json({ message: err });
//         }
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(lists);
//       });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }

// // Get a single instructor by id
// const getInstructorById = async (req, res, next) => {
//   // #swagger.tags = ['Instructors']
//   if (!ObjectId.isValid(req.params.id)) {
//     res.status(400).json('Must use a valid contact id to find a contact.');
//   }
//   try {
//     mongodb
//       .getDb()
//       .db()
//       .collection('instructors')
//       .find({ _id: ObjectId(req.params.id) })
//       .toArray((err, result) => {
//         if (err) {
//           res.status(400).json({ message: err });
//         }
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(lists[0]);
//       });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Create a new instructor
// const createNewInstructor = async (req, res, next) => {
//   // #swagger.tags = ['Instructors']
//   try {
//     const instructor = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       beltLevel: req.body.birthday,
//       birthday: req.body.beltLevel,
//       style: req.body.style,
//       strengths: req.body.strengths,
//       classes: req.body.classes,
//     };

//     const response = await mongodb
//       .getDb()
//       .db()
//       .collection('instructors')
//       .insertOne(instructor);
//     if (response.acknowledged) {
//       res.status(201).json(response);
//     } else {
//       res
//         .status(500)
//         .json(
//           response.error || 'An error occurred while creating the contact.'
//         );
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update one instructor by Id
// const updateInstructor = async (req, res, next) => {
//   // #swagger.tags = ['Instructors']
//   if (!ObjectId.isValid(req.params.id)) {
//     res.status(400).json('Must use a valid contact id to find a contact.');
//   }
//   try {
//     const instructor = {
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       beltLevel: req.body.birthday,
//       birthday: req.body.beltLevel,
//       style: req.body.style,
//       strengths: req.body.strengths,
//       classes: req.body.classes,
//     };

//     const response = await mongodb
//       .getDb()
//       .db()
//       .collection('instructors')
//       .replaceOne({ _id: ObjectId(req.params.id) }, instructor);
//     console.log(response);
//     if (response.modifiedCount > 0) {
//       res.status(204).send();
//     } else {
//       res
//         .status(500)
//         .json(
//           response.error || 'An error occurred while updating the contact.'
//         );
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete one instructor by Id
// const deleteInstructorById = async (req, res, next) => {
//   // #swagger.tags = ['Instructors']
//   if (!ObjectId.isValid(req.params.id)) {
//     res.status(400).json('Must use a valid contact id to find a contact.');
//   }
//   try {
//     const response = await mongodb
//       .getDb()
//       .db()
//       .collection('instructors')
//       .deleteOne({ _id: ObjectId(req.params.id) }, true);
//     console.log(response);
//     if (response.deletedCount > 0) {
//       res.status(204).send();
//     } else {
//       res
//         .status(500)
//         .json(
//           response.error || 'An error occurred while deleting the contact.'
//         );
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {
//   getAllInstructors,
//   getInstructorById,
//   createNewInstructor,
//   updateInstructor,
//   deleteInstructorById,
// };
