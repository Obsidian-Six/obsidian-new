const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URL || "mongodb://localhost:27017/obsidian";
  console.log("Connecting to MongoDB at:", mongoUri);
  const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed default admin user
    const seedAdmin = require('./seed');
    await seedAdmin();
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
