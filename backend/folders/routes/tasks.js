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

router.post("/agent", async (req, res) => {
  const prompt = req.body.prompt.trim().toLowerCase();

  console.log("Agent received:", prompt);

  const parts = prompt.split(" ");
  const command = parts[0];

  // ✅ ADD
  if (command === "add") {
    const text = parts.slice(1).join(" ");
    const newTask = addTask(text);

    console.log("ADD WORKED");

    return res.json({
      result: `Task added: ${text}`,
      task: newTask,
    });
  }

  // ✅ DELETE
  // if (command === "delete") {
  //   const id = Number(parts[1]);

  //   console.log("DELETE ID:", id);

  //   if (!id) {
  //     return res.json({ result: "Invalid delete command" });
  //   }

  //   deleteTask(id);

  //   console.log("DELETE WORKED");

  //   return res.json({
  //     result: `Task deleted with id ${id}`,
  //   });
  // }

  if (command === "delete") {
    const value = parts.slice(1).join(" ");

    let id = Number(value);

    // if not number → find by text
    if (isNaN(id)) {
      const task = getTasks().find((t) => t.text.toLowerCase().includes(value));

      if (!task) {
        return res.json({ result: "Task not found" });
      }

      id = task.id;
    }

    deleteTask(id);

    return res.json({
      result: `Task deleted`,
    });
  }

  // ✅ UPDATE
  // if (command === "update") {
  //   const id = Number(parts[1]);
  //   const text = parts.slice(2).join(" ");

  //   console.log("UPDATE ID:", id, "TEXT:", text);

  //   if (!id || !text) {
  //     return res.json({ result: "Invalid update command" });
  //   }

  //   const updated = updateTask(id, text);

  //   console.log("UPDATE RESULT:", updated);

  //   return res.json({
  //     result: updated ? `Task ${id} updated` : `Task not found`,
  //   });
  // }

  if (command === "update") {
    const value = parts.slice(1).join(" ");

    let id = Number(parts[1]);
    let text = parts.slice(2).join(" ");

    // if user didn’t give id → find by text
    if (isNaN(id)) {
      const oldText = parts[1];

      const task = getTasks().find((t) =>
        t.text.toLowerCase().includes(oldText),
      );

      if (!task) {
        return res.json({ result: "Task not found" });
      }

      id = task.id;
      text = parts.slice(2).join(" ");
    }

    const updated = updateTask(id, text);

    return res.json({
      result: updated ? "Task updated" : "Task not found",
    });
  }

  // ❌ ONLY IF NOTHING MATCHES
  console.log("FALLBACK AI");

  const result = await runAgent(prompt);

  res.json({ result });
});
export default router;
