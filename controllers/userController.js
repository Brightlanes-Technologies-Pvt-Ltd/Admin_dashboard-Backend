const userModel = require('../schema/userSchema');
const bcrypt = require('bcryptjs');
const { setCookies } = require('../utils/setCookies');

exports.signUp = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const userExist = await userModel.findOne({ email });
		if (userExist) {
			throw new Error('User Already exist');
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new userModel({
			name,
			email,
			password: hashedPassword
		});
		const response = await userModel.create(newUser);

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

		const user = await userModel.findOne({ email }).select('+password');
		if (!user) {
			throw new Error('Account does not exist ');
		}

		const matchPassword = await bcrypt.compare(password, user.password);
		if (!matchPassword) {
			throw new Error('Invalid Password');
		}
		user.password = undefined;
		setCookies(res, user, `welcome ${user.name}`);
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};
