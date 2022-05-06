const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUserByName);
router.post('/', userController.createNewUser);
router.put('/:username', userController.updateUser);
router.delete('/:username', userController.deleteUser);

module.exports = router;
