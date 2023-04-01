const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
	{
		className: {
			type: String,
			required: true
		},
		faculty: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		startDate: {
			type: Date,
			required: true
		},
		endDate: {
			type: Date,
			required: true
		},
		classHours: {
			type: Number,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		category: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true,
			default: 'Active'
		},
		agendas: [
			{
				type: String
			}
		],
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Class', classSchema);
