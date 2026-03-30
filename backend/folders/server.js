// this folder -
//express route start
//route connect

/////////////////////////////////////
// You did 5 main things here:

// Imported required packages (Express, CORS, dotenv, routes)
// Configured environment variables
// Created the Express app
// Added middleware (CORS + JSON parsing)
// Set up routes and started the server

process.env.OPENAI_AGENTS_DISABLE_TRACING = "true";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "../folders/routes/tasks.js";
import mongoose from "mongoose";

// import { runAgent } from "./agent/agent.js";

dotenv.config({ path: "../.env", quiet: true });

// console.log("SERVER KEY::::::::::::::", process.env.OPENAI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

// runAgent("Add task to delete scrolling");
// flow------------backend
// Request → Route → Agent/Model → Response

///flow -frontend
// Frontend / server call
//         ↓
// routes/tasks.js
//         ↓
// runAgent() (agent.js)
//         ↓
// OpenAI / OpenRouter API
//         ↓
// Response comes back
//         ↓
// Sent to frontend / console
