const express = require('express');
const { signUp, signIn } = require('../controllers/teacherController');

const teacherRouter = express.Router();

teacherRouter.route('/signup').post(signUp);

teacherRouter.route('/signin').post(signIn);

module.exports = teacherRouter;
