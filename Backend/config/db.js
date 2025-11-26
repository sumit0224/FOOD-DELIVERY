const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`database conntect`);
  } catch (error) {
    console.log(`database connection failed`);
    process.exit(1);
  }
};

module.exports = connectDB;