const mongoose = require('mongoose');

const connection_string = process.env.MONGO_URI;

const connection = async () => {
  try {
    await mongoose.connect(connection_string);
    console.log("MongoDB Atlas connected with system-database");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connection;