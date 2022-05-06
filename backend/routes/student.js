const router = require('express').Router();
const studentsController = require('../controllers/student');
const validation = require('../models/validate');

// Call functions based on url entered
router.get('/', studentsController.getAllStudents);
router.get('/:studentid', studentsController.getStudentById);
router.post('/', validation.saveStudent, studentsController.createNewStudent);
router.put(
  '/:studentid',
  validation.saveStudent,
  studentsController.updateStudent
);
router.delete('/:studentid', studentsController.deleteStudentById);

module.exports = router;
