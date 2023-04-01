exports.customRole = (req, res, next) => {
	try {
		const { user } = req;
		if (user.role !== 'admin') {
			throw new Error('admin ascess only');
		}
		next();
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};
