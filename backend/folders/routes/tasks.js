// You did 4 main things in this file

// Imported modules → express, task functions, AI agent
// Created router → express.Router()
//api request-// GET, POST, PUT, DELETE
// POST /agent → send prompt to AI (runAgent) and return result

process.env.OPENAI_AGENTS_DISABLE_TRACING = "true";
import dotenv from "dotenv";

import express from "express";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../models/taskStore.js";
import { runAgent } from "../agent/agent.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await getTasks());
});

router.post("/", async (req, res) => {
  res.json(await addTask(req.body.text));
});

router.put("/:id", async (req, res) => {
  res.json(await updateTask(req.params.id, req.body.text));
});

router.delete("/:id", async (req, res) => {
  console.log("FULL URL:", req.originalUrl);
  console.log("REQ PARAMS:", req.params);

  await deleteTask(req.params.id);
  res.sendStatus(204);
});

router.post("/agent", async (req, res) => {
  const prompt = req.body.prompt;

  const result = await runAgent(prompt);

  res.json({ result });
  console.log(result);
});
export default router;
