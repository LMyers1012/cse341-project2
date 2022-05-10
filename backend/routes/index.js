const router = require('express').Router();

// @desc    Login/Landing Page
// @route   GET /
router.get('/', (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

router.use('/api-docs', require('./swagger'));

router.use('/student', require('./student'));
router.use('/instructor', require('./instructor'));
router.use('/user', require('./user'));

module.exports = router;
