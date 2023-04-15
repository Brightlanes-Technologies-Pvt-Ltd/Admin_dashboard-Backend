const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
	{
		courseName: {
			type: String,
			required: true
		},
		faculities: [
			{
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: 'Teacher'
			}
		],
		startDate: {
			type: Date,
			required: true
		},
		endDate: {
			type: Date,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		subject: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true,
			default: 'Active'
		},
		enrolledStudents: {
			type: Number,
			require: true,
			default: 0
		},
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		deleted: {
			type: Boolean,
			default: false,
			required: true
		},
		deletedAt: {
			type: Date
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Course', courseSchema);
