const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/', userController.getAllUsers);
router.get('/:displayName', userController.getUserByDisplayName);
// router.post('/', userController.createNewUser);
// router.put('/:username', userController.updateUserByName);
router.delete('/:googleId', userController.deleteUserByGoogleId);

module.exports = router;
