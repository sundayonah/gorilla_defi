// app/db/connectDB.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // poolSize: 10,
      socketTimeoutMS:360000
    });
    // console.log('MongoDB Connected...');
  } catch (err) {
    console.error(`Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
