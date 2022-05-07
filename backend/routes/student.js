const router = require('express').Router();
const studentController = require('../controllers/student');

router.get('/', studentController.getAllStudents);
router.get('/:studentid', studentController.getStudent);
router.post('/', studentController.createNewStudent);
router.put('/:studentid', studentController.updateStudentById);
router.delete('/:studentid', studentController.deleteStudentById);

module.exports = router;
