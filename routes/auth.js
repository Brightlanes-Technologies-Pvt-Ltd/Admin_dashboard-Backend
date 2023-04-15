const express = require('express');
const {
	signUp,
	signIn,
	getAllFaculty,
	getAllStudents,
	changeRole
} = require('../controllers/userController');
const { customRole } = require('../middlewares/customRoles');
const { isUserLoggedIn } = require('../middlewares/isUserLoggedIn');

const authRouter = express.Router();

authRouter.route('/signup').post(signUp);

authRouter.route('/signin').post(signIn);

authRouter.route('/faculty').get(isUserLoggedIn, getAllFaculty);

// authRouter.route('/students').get(isUserLoggedIn, getAllStudents);

authRouter.route('/change-role').put(isUserLoggedIn, customRole, changeRole);

module.exports = authRouter;
