import mongoose from "mongoose";

// Define a Mongoose schema
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    match: /^\S+@\S+$/,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model based on the schema
const User = mongoose.model("users", userSchema);

export default User;
