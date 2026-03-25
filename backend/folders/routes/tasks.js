import express from "express";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../models/taskStore.js";
import { runAgent } from "../agent/agent.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(getTasks());
  console.log("coming from get request from tasks.js");
});

router.post("/", (req, res) => {
  res.json(addTask(req.body.text));
  console.log("coming from post request from tasks.js");
});

router.put("/:id", (req, res) => {
  res.json(updateTask(parseInt(req.params.id), req.body.text));
  console.log("coming from put request from tasks.js");
});

router.delete("/:id", (req, res) => {
  deleteTask(parseInt(req.params.id));
  res.sendStatus(204);
  console.log("coming from delete request from tasks.js");
});

// 🤖 Agent route
router.post("/agent", async (req, res) => {
  const result = await runAgent(req.body.prompt);
  res.json({ result });
  console.log("coming from agent route  from tasks.js");
});

export default router;
