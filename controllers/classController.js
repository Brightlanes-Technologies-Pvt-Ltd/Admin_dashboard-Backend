const classModel = require('../schema/classSchema');
const userModel = require('../schema/userSchema');

exports.createClass = async (req, res) => {
	try {
		const {
			className,
			faculty,
			startDate,
			endDate,
			classHours,
			description,
			category
		} = req.body;
		const { user } = req;
		if (
			!className ||
			!faculty ||
			!startDate ||
			!endDate ||
			!classHours ||
			!description ||
			!category
		) {
			throw new Error('All fields are required');
		}

		const newClass = new classModel({
			className,
			faculty,
			startDate,
			endDate,
			classHours,
			description,
			category,
			created_by: user._id
		});

		const response = await classModel.create(newClass);

		res.status(200).json({
			success: true,
			class: response
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: true,
			message: error.message
		});
	}
};

exports.createClassesFromCSV = async (req, res) => {
	try {
		const { user } = req;
		const { classes } = req.body;

		for (let i = 0; i < classes.length; i++) {
			let teacher = await userModel.findOne({ email: classes[i].faculty });
			if (!teacher) {
				throw new Error(`${classes[i].faculty} does not exist`);
			}

			if (teacher.role !== 'teacher') {
				throw new Error(`${classes[i].faculty} is not a teacher's email id `);
			}
			classes[i].faculty = teacher._id;
			classes[i].created_by = user._id;
		}

		const newClasses = await classModel.create(classes);

		res.status(200).json({
			success: true,
			classes: newClasses
		});
	} catch (error) {
		res.status(400).json({ success: true, message: error.message });
	}
};
