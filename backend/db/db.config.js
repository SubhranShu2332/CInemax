// const mongoose = require('mongoose');
import mongoose from "mongoose";
// const dbConfig = require('./db.config');  // Import the db configuration

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URL and options from the config file
    await mongoose.connect("mongodb+srv://21bctc68:Subhranshu2332@cluster0.vltqonq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Assignment7");
    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit();
  }
};

// Export the connection function
export default connectDB;
