const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/education_dev");
    console.log("Connect Successfully!");
  } catch (error) {
    console.log("Connect Failure:", error);
  }
}

module.exports = { connect };
