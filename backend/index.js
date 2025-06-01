// api/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "../routes/booksRoute.js";
import { mongoDBURL } from "../config.js";
import serverless from "serverless-http";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/books', booksRoute);

// Connect to MongoDB
mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB error:", error));

// Export for Vercel
export const handler = serverless(app);
