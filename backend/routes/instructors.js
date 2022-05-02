const router = require('express').Router();
const instructorsController = require('../controllers/instructors');

// Call functions based on url entered
router.get('/', instructorsController.getAllInstructors);
router.get('/:id', instructorsController.getInstructorById);
router.post('/', instructorsController.createNewInstructor);
router.put('/:id', instructorsController.updateInstructor);
router.delete('/:id', instructorsController.deleteInstructorById);

module.exports = router;
