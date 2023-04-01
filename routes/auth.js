const express = require('express');
const { signUp, signIn } = require('../controllers/userController');
const authRouter = express.Router();

authRouter.route('/signup').post(signUp);

authRouter.route('/signin').post(signIn);

module.exports = authRouter;
