const app = require("./App");
require("./config/config");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server is runing at port " + PORT);
});
