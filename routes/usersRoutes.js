const express = require('express');
const usersController = require('../controllers/usersController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/current-user/update').post(auth, usersController.updateCurrentUser);
router.route('/current-user').get(auth, usersController.currentUser);
router.route('/:id/data').get(auth, usersController.userByID);

module.exports = router;
