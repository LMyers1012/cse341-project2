const router = require('express').Router();
const instructorController = require('../controllers/instructor');

router.get('/', instructorController.getAllInstructors);
router.get('/:instructorid', instructorController.getInstructorById);
router.post('/', instructorController.createNewInstructor);
router.put('/:instructorid', instructorController.updateInstructorById);
router.delete('/:instructorid', instructorController.deleteInstructorById);

module.exports = router;
