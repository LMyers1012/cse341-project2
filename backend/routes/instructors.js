const router = require('express').Router();
const instructorsController = require('../controllers/instructors');
const validation = require('../models/validate');

// Call functions based on url entered
router.get('/', instructorsController.getAllInstructors);
router.get('/:id', instructorsController.getInstructorById);
router.post(
  '/',
  validation.saveInstructor,
  instructorsController.createNewInstructor
);
router.put(
  '/:id',
  validation.saveInstructor,
  instructorsController.updateInstructor
);
router.delete('/:id', instructorsController.deleteInstructorById);

module.exports = router;
