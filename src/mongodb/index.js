import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const PROJECT_USERNAME = process.env.PROJECT_USERNAME;
const PASSWORD = process.env.PASSWORD;
const PROJECT_NAME = process.env.PROJECT_NAME;
const USER_DETAILS_DATABASE_NAME = process.env.USER_DETAILS_DATABASE_NAME;
// Connection URI
const uri = `mongodb+srv://${PROJECT_USERNAME}:${PASSWORD}@${PROJECT_NAME}.mvetefk.mongodb.net/${USER_DETAILS_DATABASE_NAME}?retryWrites=true&w=majority`;

// Create a new MongoClient

// Connect to the MongoDB server
export async function connectToMongoDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(uri);
    console.log("mongoose connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();
