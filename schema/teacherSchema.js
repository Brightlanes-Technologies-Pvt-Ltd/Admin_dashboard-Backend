const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
			select: false
		},
		subject: [
			{
				type: String,
				require: true
			}
		],
		joiningDate: {
			type: Date,
			required: true,
			default: new Date()
		},
		mobileNumber: {
			type: Number,
			required: true
		},
		rate: {
			type: Number,
			required: true,
			default: 0
		},
		role: {
			type: String,
			required: true,
			default: 'teacher',
		},
		profileImage: {
			type: String
		}
	},
	{
		timeStamps: true
	}
);

module.exports = mongoose.model('Teacher', teacherSchema);
