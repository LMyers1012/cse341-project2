const router = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  });
});

router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard', {
    name: req.user.firstName,
  });
});

router.use('/api-docs', ensureAuth, require('./swagger'));

router.use('/student', ensureAuth, require('./student'));
router.use('/instructor', ensureAuth, require('./instructor'));
router.use('/user', ensureAuth, require('./user'));

module.exports = router;
