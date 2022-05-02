const router = require('express').Router();
const studentsController = require('../controllers/students');

// Call functions based on url entered
router.get('/', studentsController.getAllStudents);
router.get('/:id', studentsController.getStudentById);
router.post('/', studentsController.createNewStudent);
router.put('/:id', studentsController.updateStudent);
router.delete('/:id', studentsController.deleteStudentById);

module.exports = router;
