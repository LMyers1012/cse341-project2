const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/students', require('./student'));
router.use('/instructors', require('./instructor'));
router.use('/user', require('./user'));

module.exports = router;
