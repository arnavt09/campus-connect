const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/campusconnect")
    .then(function () {
      console.log("MongoDB Connected");
    })
    .catch(function (error) {
      console.log("MongoDB connection failed");
      console.log(error);
    });
}

module.exports = connectDB;