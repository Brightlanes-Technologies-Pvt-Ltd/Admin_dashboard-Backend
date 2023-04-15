const courseModel = require('../schema/courseSchema');

exports.createCourse = async (req, res) => {
	try {
		const { user } = req;

		const newCourse = new courseModel({
			...req.body,
			created_by: user._id
		});

		const response = await courseModel.create(newCourse);

		res.status(200).json({
			success: true,
			class: response,
			message: 'Course Created Successfully'
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

exports.getAllCourse = async (req, res) => {
	try {
		const courses = await courseModel.find({ deleted: false });

		res.status(200).json({ success: true, courses });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.getAllTeachersCourses = async (req, res) => {
	try {
		const courses = await courseModel.find({
			faculities: { $in: [req.params.teacherId] }
		});
		res.status(200).json({
			success: true,
			courses
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};
