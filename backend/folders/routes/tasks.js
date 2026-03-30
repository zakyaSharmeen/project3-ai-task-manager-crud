// You did 7 main things in this file

// Imported modules → express, task functions, AI agent
// Created router → express.Router()
// GET / → fetch all tasks
// POST / → add new task
// PUT /:id → update task
// DELETE /:id → delete task
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

// router.get("/", (req, res) => {
//   res.json(getTasks());
//   console.log("coming from get request from tasks.js");
// });

// router.post("/", (req, res) => {
//   res.json(addTask(req.body.text));
//   console.log("coming from post request from tasks.js");
// });

// router.put("/:id", (req, res) => {
//   res.json(updateTask(parseInt(req.params.id), req.body.text));
//   console.log("coming from put request from tasks.js");
// });

// router.delete("/:id", (req, res) => {
//   deleteTask(parseInt(req.params.id));
//   res.sendStatus(204);
//   console.log("coming from delete request from tasks.js");
// });

// router.post("/agent", async (req, res) => {
//   const prompt = req.body.prompt.trim().toLowerCase();

//   console.log("Agent received:", prompt);

//   const parts = prompt.split(" ");
//   const command = parts[0];

//   // ADD
//   if (command === "add") {
//     const text = parts.slice(1).join(" ");
//     const newTask = addTask(text);

//     console.log("ADD WORKED");

//     return res.json({
//       result: `Task added: ${text}`,
//       task: newTask,
//     });
//   }

//   //DELETE

//   if (command === "delete") {
//     const value = parts.slice(1).join(" ");

//     let id = Number(value);

//     // if not number → find by text
//     if (isNaN(id)) {
//       const task = getTasks().find((t) => t.text.toLowerCase().includes(value));

//       if (!task) {
//         return res.json({ result: "Task not found" });
//       }

//       id = task.id;
//     }

//     deleteTask(id);
//     console.log("DELETE WORKED");

//     return res.json({
//       result: `Task deleted`,
//     });
//   }

//   // ✅ UPDATE

//   if (command === "update") {
//     let id = Number(parts[1]);
//     let text = parts.slice(2).join(" ").trim();

//     // ✅ If NOT ID → treat as text search
//     if (isNaN(id)) {
//       const oldText = parts[1];

//       const task = getTasks().find((t) =>
//         t.text.toLowerCase().includes(oldText),
//       );

//       if (!task) {
//         return res.json({ result: "Task not found" });
//       }

//       id = task.id;

//       // new text comes after old text
//       text = parts.slice(2).join(" ").trim();
//     }

//     console.log("UPDATE ID:", id);
//     console.log("NEW TEXT:", text);

//     if (!text) {
//       return res.json({
//         result: "Invalid format → update <id/text> <new text>",
//       });
//     }

//     const updated = updateTask(id, text);

//     return res.json({
//       result: updated ? "Task updated" : "Task not found",
//     });
//   }

//   console.log("FALLBACK AI");

//   const result = await runAgent(prompt);

//   res.json({ result });
// });

router.get("/", async (req, res) => {
  res.json(await getTasks());
});

router.post("/", async (req, res) => {
  res.json(await addTask(req.body.text));
});

router.put("/:id", async (req, res) => {
  res.json(await updateTask(req.params.id, req.body.text));
});

// router.delete("/:id", async (req, res) => {
//   await deleteTask(req.params.id);
//   res.sendStatus(204);
// });
// router.delete("/:id", async (req, res) => {
//   console.log("REQ ID:", req.params.id);

//   await deleteTask(req.params.id); //
//   res.sendStatus(204);
// });

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
