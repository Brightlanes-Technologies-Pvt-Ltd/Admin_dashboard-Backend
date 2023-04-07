const jwt = require('jsonwebtoken');

exports.setCookies = async (res, user, message) => {
	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

	const options = {
		httpOnly: true,
		expires: new Date(
			Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
		)
	};

	res.status(200).cookie('token', token, options).json({
		success: true,
		message,
		user
	});
};
