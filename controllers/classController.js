const classModel = require('../schema/classSchema');
const userModel = require('../schema/teacherSchema');
const csv = require('csvtojson');

exports.createClass = async (req, res) => {
	try {
		const { user } = req;

		const newClass = new classModel({
			...req.body,
			created_by: user._id
		});

		const response = await classModel.create(newClass);

		res.status(200).json({
			success: true,
			class: response,
			message: 'Class Created Successfully'
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({
			success: false,
			message: error.message
		});
	}
};

// exports.createClassesFromCSV = async (req, res) => {
// 	try {
// 		const { user } = req;
// 		const { classes } = req.body;

// 		for (let i = 0; i < classes.length; i++) {
// 			let teacher = await userModel.findOne({ email: classes[i].faculty });
// 			if (!teacher) {
// 				throw new Error(`${classes[i].faculty} does not exist`);
// 			}

// 			if (teacher.role !== 'teacher') {
// 				throw new Error(`${classes[i].faculty} is not a teacher's email id `);
// 			}
// 			classes[i].faculty = teacher._id;
// 			classes[i].created_by = user._id;
// 		}

// 		const newClasses = await classModel.create(classes);

// 		res.status(200).json({
// 			success: true,
// 			classes: newClasses
// 		});
// 	} catch (error) {
// 		res.status(400).json({ success: false, message: error.message });
// 	}
// };

exports.getAllClasses = async (req, res) => {
	try {
		const classes = await classModel.find({ deleted: false });

		res.status(200).json({ success: true, classes });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.createClassesFromCSV = async (req, res) => {
	try {
		const { user } = req;
		if (!req.files) {
			throw new Error('please provide a file');
		}

		const jsonArray = await csv().fromFile(req.files.file.tempFilePath);

		const newArray = [];

		for (let i = 0; i < jsonArray.length; i++) {
			let teacher = await userModel.findOne({ email: jsonArray[i].Faculty });

			if (!teacher) {
				throw new Error(`${jsonArray[i].Faculty} does not exist`);
			}

			if (teacher.role !== 'teacher') {
				throw new Error(`${jsonArray[i].Faculty} is not a teacher's email id `);
			}
			newArray.push({
				className: jsonArray[i].ClassName,
				faculty: teacher._id,
				startDate: new Date(jsonArray[i].StartDate),
				endDate: new Date(jsonArray[i].EndDate),
				classHours: jsonArray[i].ClassHours,
				description: jsonArray[i].Description,
				category: jsonArray[i].Category,
				agendas: jsonArray[i].agendas.split(','),
				created_by: user._id
			});
		}
		const classes = await classModel.create(newArray);

		res.status(200).json({
			success: true,
			classes
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.teacherUpdateClass = async (req, res) => {
	try {
		const { agendas, startDate, endDate, status } = req.body;

		const updatedClass = await classModel.findByIdAndUpdate(
			{ _id: req.params.id },
			{ agendas, startDate, endDate, status },
			{
				new: true
			}
		);
		res.status(200).json({
			success: true,
			updatedClass
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.deleteClass = async (req, res) => {
	try {
		const deleted = await classModel.findByIdAndUpdate(
			{ _id: req.params.id },
			{ deleted: true, status: 'Cancelled', deletedAt: new Date() },
			{ new: true }
		);

		res.status(200).json({
			success: true,
			deleted,
			message: 'Class Deleted Successfully'
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.adminUpdateClass = async (req, res) => {
	try {
		const updatedClass = await classModel.findByIdAndUpdate(
			{ _id: req.params.id },
			{ ...req.body },
			{
				new: true
			}
		);
		res.status(200).json({
			success: true,
			updatedClass
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.getClassById = async (req, res) => {
	try {
		const data = await classModel.findOne({ _id: req.params.id });

		res.status(200).json({ success: true, data });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

exports.getAllClassesOfAcourse = async (req, res) => {
	try {
		const classes = await classModel.find({ classOf: req.params.courseId });

		res.status(200).json({ success: true, classes });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};
