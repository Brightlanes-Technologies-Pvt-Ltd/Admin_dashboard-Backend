const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressFileupload = require("express-fileupload");
const app = express();
require("dotenv").config();

const auth = require("./routes/auth");
const classes = require("./routes/class");
const teachers = require("./routes/teacher");
const course = require("./routes/course");
const topic = require("./routes/topic");

// const whitelist = process.env.ORIGIN.split(",");
console.log(process.env.ORIGIN);

app.use(
  cors({
    origin: ["http://localhost:3000", "https://dashboard.10pointer.com/"],
    credentials: true,
  })
);

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// console.log(corsOptions);
// app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(
  expressFileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: `server is not runing at ${process.env.PORT}`,
  });
});

app.use("/api/user", auth);
app.use("/api/class", classes);
app.use("/api/teacher", teachers);
app.use("/api/course", course);
app.use("/api/topic", topic);

module.exports = app;
