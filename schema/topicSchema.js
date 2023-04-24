const mongoose = require("mongoose");

const topicSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },

  topicOf: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Class",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  aws: {
    type: Boolean,
    required: true,
    default: false,
  },
  materialDistributed: {
    type: Boolean,
    required: true,
    default: false,
  },
  test: {
    type: Boolean,
    required: true,
    default: false,
  },
  mentorship: {
    type: Boolean,
    required: true,
    default: false,
  },

  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});
module.exports = mongoose.model("Topic", topicSchema);
