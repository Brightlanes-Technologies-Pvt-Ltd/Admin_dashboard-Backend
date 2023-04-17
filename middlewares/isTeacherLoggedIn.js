const teacherModel = require('../schema/teacherSchema');
const jwt = require('jsonwebtoken');

exports.isTeacherLoggedIn = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			throw new Error('Please login');
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await teacherModel.findById({ _id: decoded.id });

		next();
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};
