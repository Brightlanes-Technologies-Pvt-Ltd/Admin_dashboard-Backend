const express = require("express");
const { isUserLoggedIn } = require("../middlewares/isUserLoggedIn");
const { customRole } = require("../middlewares/customRoles");
const {
  createTopic,
  getAllTopicsOfAClass,
  updateTopics,
  getASingleTopicById,
} = require("../controllers/topicController");
const { isTeacherLoggedIn } = require("../middlewares/isTeacherLoggedIn");

const topicRouter = express.Router();
topicRouter.route("/create").post(isUserLoggedIn, customRole, createTopic);

topicRouter.route("/:classId").get(isUserLoggedIn, getAllTopicsOfAClass);

topicRouter.route("/update/:topicId").put(isUserLoggedIn, updateTopics);
topicRouter
  .route("/getsingletopic/:id")
  .get(isUserLoggedIn, getASingleTopicById);

module.exports = topicRouter;
