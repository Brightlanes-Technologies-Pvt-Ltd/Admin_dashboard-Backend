const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://rohitAtRabblesoft:Rabble1234@cluster0.oqwabdu.mongodb.net/master_dashboard?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db connected");
  });
