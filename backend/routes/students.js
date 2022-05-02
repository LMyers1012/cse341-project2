const router = require('express').Router();
const contactsController = require('../controllers/ema');

// Call functions based on url entered
router.get('/', contactsController.getAllStudents);
router.get('/:id', contactsController.getStudentById);
router.post('/', contactsController.createNewStudent);
router.put('/:id', contactsController.updateStudent);
router.delete('/:id', contactsController.deleteStudentById);

module.exports = router;
