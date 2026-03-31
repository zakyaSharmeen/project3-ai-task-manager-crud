// //3 things

// Creates add task, delete, delete all, update tool
// Creates AI agent (instructions, tool)
// Runs agent and returns output

process.env.OPENAI_AGENTS_DISABLE_TRACING = "true";
import dotenv from "dotenv";

dotenv.config({ path: "../.env", quiet: true }); // explicitly load from backend/.env

///////////////////////////////////testting

import { Agent, run, tool } from "@openai/agents";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../models/taskStore.js";
import { TaskModel } from "../models/taskStore.js";
import mongoose from "mongoose";

// Tool: Add Task
const addTaskTool = tool({
  name: "addTask",
  description: "Add a new task",
  parameters: {
    type: "object",
    properties: {
      text: { type: "string" },
    },
    required: ["text"],
  },
  execute: async ({ text }) => {
    console.log("TOOL: addTask", text);

    return addTask(text);
  },
});
//delete all the tasks at ones

const deleteAllTasksTool = tool({
  name: "deleteAllTasks",
  description: "Delete all tasks",
  parameters: {
    type: "object",
    properties: {},
  },

  execute: async () => {
    console.log("TOOL: deleteAllTasks");

    await TaskModel.deleteMany({});

    return { success: true };
  },
});

const deleteTaskTool = tool({
  name: "deleteTask",
  description: "Delete a task by id or text",
  parameters: {
    type: "object",
    properties: {
      id: { type: "string" }, // ✅ FIXED
    },
    required: ["id"],
  },

  execute: async ({ id }) => {
    let taskId = id;

    // if not valid ObjectId → find by text
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const tasks = await getTasks();

      const found = tasks.find((t) =>
        t.text.toLowerCase().includes(id.toLowerCase()),
      );

      if (!found) {
        return { success: false, message: "Task not found" };
      }

      taskId = found._id;
    }

    await deleteTask(taskId);

    return { success: true };
  },
});

const updateTaskTool = tool({
  name: "updateTask",
  description: "Update a task by id or text",
  parameters: {
    type: "object",
    properties: {
      id: { type: "string" }, // ✅ FIXED
      text: { type: "string" },
    },
    required: ["id", "text"],
  },

  execute: async ({ id, text }) => {
    console.log("TOOL: updateTask", id, text);

    let taskId = id;

    // if not valid ObjectId → find by text
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const tasks = await getTasks();

      const found = tasks.find((t) =>
        t.text.toLowerCase().includes(id.toLowerCase()),
      );

      if (!found) {
        return { success: false, message: "Task not found" };
      }

      taskId = found._id;
    }

    const updated = await updateTask(taskId, text);

    if (!updated) {
      return { success: false, message: "Task not found" };
    }

    return { success: true, task: updated }; // ✅ return result
  },
});

const agent = new Agent({
  name: "TaskManager",
  model: "gpt-4.1-mini",
  //
  instructions: `
You are a task manager AI.

RULES:
- ALWAYS use tools to perform actions
- NEVER just reply without calling a tool
- If user says "delete all" or "clear all tasks", you MUST call deleteAllTasks
- If user says "add", call addTask
- If user says "update", call updateTask
- If user says "delete", call deleteTask

Do not fake responses.
Only respond after using tools.
`,
  tools: [addTaskTool, deleteTaskTool, updateTaskTool, deleteAllTasksTool],
});

export const runAgent = async (input) => {
  const response = await run(agent, input);

  return response.finalOutput;
};
