import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const PROJECTUSERNAME = process.env.PROJECTUSERNAME;
const PASSWORD = process.env.PASSWORD;
const PROJECTNAME = process.env.PROJECTNAME;
const USERDETAILSDATABASENAME = process.env.USERDETAILSDATABASENAME;
// Connection URI
const uri = `mongodb+srv://${PROJECTUSERNAME}:${PASSWORD}@${PROJECTNAME}.mvetefk.mongodb.net/${USERDETAILSDATABASENAME}?retryWrites=true&w=majority`;

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
