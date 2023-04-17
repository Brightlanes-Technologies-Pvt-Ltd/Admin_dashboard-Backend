const courseModel = require("../schema/courseSchema");
const csv = require("csvtojson");
const teacherModel = require("../schema/teacherSchema");

exports.createCourse = async (req, res) => {
  try {
    const { user } = req;

    const newCourse = new courseModel({
      ...req.body,
      created_by: user._id,
    });

    const response = await courseModel.create(newCourse);

    res.status(200).json({
      success: true,
      class: response,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
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
      faculities: { $in: [req.params.teacherId] },
    });
    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getACourse = async (req, res) => {
  try {
    const course = await courseModel.findById({ _id: req.params.courseId });

    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.createCourseFromCSV = async (req, res) => {
  try {
    const { user } = req;
    if (!req.files) {
      throw new Error("please provide a file");
    }

    const jsonArray = await csv().fromFile(req.files.file.tempFilePath);

    const newCourses = [];

    for (let i = 0; i < jsonArray.length; i++) {
      let teachers = [];
      const faculities = jsonArray[i].faculities.split(",");
      for (let j = 0; j < faculities.length; j++) {
        const teacher = await teacherModel.findOne({
          email: faculities[i].trim(),
        });

        if (!teacher) {
          throw new Error(`${faculities[i]} does not exist`);
        }

        teachers = [...teachers, teacher];
      }

      newCourses.push({
        courseName: jsonArray[i].courseName,
        faculities: teachers,
        startDate: new Date(jsonArray[i].startDate),
        endDate: new Date(jsonArray[i].endDate),
        description: jsonArray[i].description,
        subject: jsonArray[i].subject,
        created_by: user._id,
      });
    }
   
    const courses = await courseModel.create(newCourses);

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
