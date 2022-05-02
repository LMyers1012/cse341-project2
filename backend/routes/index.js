const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/students', require('./students'));
router.use('/instructors', require('./instructors'));

module.exports = router;
