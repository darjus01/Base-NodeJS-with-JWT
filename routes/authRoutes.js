const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/usersController');
const usersMiddleware = require('../middlewares/usersMiddleware');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/activate-account/:hashLink').post(auth, userController.activateAccount);
router.route('/register').post(usersMiddleware.registerValidation, authController.register);
router.route('/login').post(authController.login);

module.exports = router;
