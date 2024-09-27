
import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  year: {
    type: String,
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, { timestamps: true });

// Create and export the user model
const User = mongoose.model('User', userSchema);
export default User;
