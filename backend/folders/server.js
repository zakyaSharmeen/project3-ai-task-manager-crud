import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "../folders/routes/tasks.js";
import { runAgent } from "./agent/agent.js";

// dotenv.config();
dotenv.config({ quiet: true });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

runAgent("Add task to delete scrolling");
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
