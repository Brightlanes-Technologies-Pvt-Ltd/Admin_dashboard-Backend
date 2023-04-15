const express = require('express');
const { isUserLoggedIn } = require('../middlewares/isUserLoggedIn');
const { customRole } = require('../middlewares/customRoles');
const {
	createCourse,
	getAllCourse,
	getAllTeachersCourses
} = require('../controllers/courseController');
const courseRouter = express.Router();

courseRouter.route('/create').post(isUserLoggedIn, customRole, createCourse);

courseRouter.route('/').get(isUserLoggedIn, customRole, getAllCourse);

courseRouter.route('/:teacherId').get(isUserLoggedIn, getAllTeachersCourses);

module.exports = courseRouter;
