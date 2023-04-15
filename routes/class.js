const express = require('express');
const {
	createClass,
	createClassesFromCSV,
	getAllClasses,
	teacherUpdateClass,
	adminUpdateClass,
	deleteClass,
	getClassById,
	getAllClassesOfAcourse
} = require('../controllers/classController');
const { customRole } = require('../middlewares/customRoles');
const classRouter = express.Router();
const { isUserLoggedIn } = require('../middlewares/isUserLoggedIn');

classRouter.route('/create').post(isUserLoggedIn, customRole, createClass);

classRouter
	.route('/createfromcsv')
	.post(isUserLoggedIn, customRole, createClassesFromCSV);

classRouter.route('/').get(isUserLoggedIn, getAllClasses);

classRouter.route('/update/:id').put(isUserLoggedIn, teacherUpdateClass);

classRouter
	.route('/adminupdate/:id')
	.put(isUserLoggedIn, customRole, adminUpdateClass);

classRouter
	.route('/delete/:id')
	.delete(isUserLoggedIn, customRole, deleteClass);

classRouter.route('/getclassbyid/:id').get(isUserLoggedIn, getClassById);

classRouter.route('/:courseId').get(isUserLoggedIn, getAllClassesOfAcourse);

module.exports = classRouter;
