const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/students', require('./students'));

module.exports = router;
