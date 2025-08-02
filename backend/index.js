import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes.js";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import aiRoutes from './routes/ai.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(ClerkExpressWithAuth());
// console.log("api key : ", process.env.OPENAI_API_KEY);
app.use("/notes", noteRoutes);
app.use('/api/ai', aiRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on http://localhost:${process.env.PORT} and ✅ MongoDB connected`)
    );
  })
  .catch((err) => console.log("❌ MongoDB connection failed:", err));
