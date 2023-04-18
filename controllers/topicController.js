const topicModel = require("../schema/topicSchema");

exports.createTopic = async (req, res) => {
  try {
    const { user } = req;

    const newTopic = new topicModel({
      ...req.body,
    });
    const response = await topicModel.create(newTopic);
    res.status(200).json({
      success: true,
      topic: response,
      message: "topic created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllTopicsOfAClass = async (req, res) => {
  try {
    const topics = await topicModel.find({ topicOf: req.params.classId });

    res.status(200).json({ success: true, topics });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateTopics = async (req, res) => {
  try {
    const topic = await topicModel.findByIdAndUpdate(
      { _id: req.params.topicId },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      topic,
      message: "Updated successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getASingleTopicById = async (req, res) => {
  try {
    const data = await topicModel.findOne({ _id: req.params.id });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


