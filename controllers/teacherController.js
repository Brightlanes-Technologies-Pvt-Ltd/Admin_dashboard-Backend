const teacherModel = require('../schema/teacherSchema');
const bcrypt = require('bcryptjs');
const { setCookies } = require('../utils/setCookies');

exports.signUp = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			subject,
			joiningDate,
			mobileNumber
		} = req.body;
		const teacherExist = await teacherModel.findOne({ email });
		if (teacherExist) {
			throw new Error('Teacher Already exist');
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const newTeacher = new teacherModel({
			firstName,
			lastName,
			email,
			password,
			subject,
			joiningDate,
			mobileNumber,
			password: hashedPassword
		});
		const response = await teacherModel.create(newTeacher);

		setCookies(res, response, 'Account Created Successfully');
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

exports.signIn = async (req, res) => {
	try {
		const { email, password } = req.body;

		const teacher = await teacherModel.findOne({ email }).select('+password');
		if (!teacher) {
			throw new Error('Account does not exist ');
		}

		const matchPassword = await bcrypt.compare(password, teacher.password);
		if (!matchPassword) {
			throw new Error('Invalid Password');
		}
		teacher.password = undefined;
		setCookies(res, teacher, `welcome ${teacher.firstName}`);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};
