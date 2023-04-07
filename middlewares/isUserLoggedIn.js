const userModel = require('../schema/userSchema');
const jwt = require('jsonwebtoken');

exports.isUserLoggedIn = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (!token) {
			throw new Error('Please login');
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		req.user = await userModel.findById({ _id: decoded.id });

		next();
	} catch (error) {
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};
