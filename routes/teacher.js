const express = require('express');
const { signUp, signIn , getAllFaculty } = require('../controllers/teacherController');
const { isTeacherLoggedIn } = require('../middlewares/isTeacherLoggedIn');


const teacherRouter = express.Router();

teacherRouter.route('/signup').post(signUp);

teacherRouter.route('/signin').post(signIn);

teacherRouter.route('/faculty').get(isTeacherLoggedIn, getAllFaculty);

module.exports = teacherRouter;
