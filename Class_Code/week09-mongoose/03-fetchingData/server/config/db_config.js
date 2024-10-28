// adding our mongoDB database
const mongoose = require("mongoose"); // importing the dependancy
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "YOUR STRING HERE + DB Name"
    );
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
