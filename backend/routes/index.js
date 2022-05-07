const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/student', require('./student'));
router.use('/instructor', require('./instructor'));
router.use('/user', require('./user'));

module.exports = router;
