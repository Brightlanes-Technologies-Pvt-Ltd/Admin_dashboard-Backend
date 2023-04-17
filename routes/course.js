const express = require('express');
const { isUserLoggedIn } = require('../middlewares/isUserLoggedIn');
const { customRole } = require('../middlewares/customRoles');
const {
	createCourse,
	getAllCourse,
	getAllTeachersCourses,
	getACourse,
	createCourseFromCSV
} = require('../controllers/courseController');
const courseRouter = express.Router();

courseRouter.route('/create').post(isUserLoggedIn, customRole, createCourse);
courseRouter.route('/create/csv').post(isUserLoggedIn, customRole, createCourseFromCSV);


courseRouter.route('/').get(isUserLoggedIn, customRole, getAllCourse);

courseRouter.route('/one/:courseId').get(isUserLoggedIn , getACourse);

courseRouter.route('/:teacherId').get(isUserLoggedIn, getAllTeachersCourses);

module.exports = courseRouter;
