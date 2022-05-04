const router = require('express').Router();
const studentsController = require('../controllers/students');
const validation = require('../models/validate');

// Call functions based on url entered
router.get('/', studentsController.getAllStudents);
router.get('/:id', studentsController.getStudentById);
router.post('/', validation.saveStudent, studentsController.createNewStudent);
router.put('/:id', validation.saveStudent, studentsController.updateStudent);
router.delete('/:id', studentsController.deleteStudentById);

module.exports = router;
