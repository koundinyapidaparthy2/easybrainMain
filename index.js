import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToMongoDB } from "./src/mongodb/index.js";
import routes from "./src/routes/index.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/auth", routes);

connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ${PORT}`);
    });
  })
  .catch();
