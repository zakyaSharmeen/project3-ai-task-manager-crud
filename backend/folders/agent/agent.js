process.env.OPENAI_AGENTS_DISABLE_TRACING = "true";

import dotenv from "dotenv";

dotenv.config({ path: "../.env", quiet: true }); // explicitly load from backend/.env

console.log("SERVER KEY::::::::::::::2", process.env.OPENAI_API_KEY);
////////////////////////
//MADE WITH LLM- GPT

// import { client } from "../openai.js";

// export const runAgent = async (input) => {
//   const response = await client.chat.completions.create({
//     model: "gpt-4.1-mini",
//     // model: "openai/gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: `
// You are an AI task manager agent.

// Your job:
// - Understand user requests
// - Help with tasks (add, update, delete, suggest)
// - Respond clearly and shortly
// - If user gives a task, rephrase it cleanly

// Do not give long explanations.
// `,
//       },
//       { role: "user", content: input },
//     ],
//   });

//   //   return response.choices[0].message.content;
//   const result = response.choices[0].message.content;

//   console.log("🤖 Agent Response:", result); // 👈 THIS LINE

//   return result;
// };

///////////////////////////////////////////////////////////////////////////////////

//MADE WITH LLM+SDK

// process.env.OPENAI_AGENTS_DISABLE_TRACING = "true";
// import "dotenv/config";

// import { Agent, run } from "@openai/agents";

// const agent = new Agent({
//   name: "TaskManager",
//   model: "gpt-4.1-mini",
//   instructions: `
// You are an AI task manager agent.

// Your job:
// - Understand user requests
// - Help with tasks (add, update, delete, suggest)
// -if the command comes update to the user given so only add the user given task
// - Respond clearly and shortly
// - If user gives a task, rephrase it cleanly

// Do not give long explanations.
// `,
// });

// export const runAgent = async (input) => {
//   const response = await run(agent, input);

//   const result = response.finalOutput;

//   console.log(
//     "🤖 Agent Response::::::::::::::::::::::::::::::::::::::::::::::::::::::::;;:",
//     result,
//   );
//   console.log("KEY:", process.env.OPENAI_API_KEY);

//   return result;
// };

///////////////////////////////////testting

import { Agent, run, tool } from "@openai/agents";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../models/taskStore.js";

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

// Tool: Delete Task
const deleteTaskTool = tool({
  name: "deleteTask",
  description: "Delete a task by id",
  parameters: {
    type: "object",
    properties: {
      id: { type: "number" },
    },
    required: ["id"],
  },
  execute: async ({ id }) => {
    console.log("TOOL: deleteTask", id);

    deleteTask(id);
    return { success: true };
  },
});

// Tool: Update Task
const updateTaskTool = tool({
  name: "updateTask",
  description: "Update a task",
  parameters: {
    type: "object",
    properties: {
      id: { type: "number" },
      text: { type: "string" },
    },
    required: ["id", "text"],
  },
  execute: async ({ id, text }) => {
    console.log("TOOL: updateTask", id, text);

    return updateTask(id, text);
  },
});

const agent = new Agent({
  name: "TaskManager",
  model: "gpt-4.1-mini",
  instructions: `
You are a task manager AI.

- Perform actions using tools
- After using a tool, respond with a short message
Examples:
- "Task added successfully"
- "Task deleted"
- "Task updated"

Do not return JSON.
Keep it short.
`,
  tools: [addTaskTool, deleteTaskTool, updateTaskTool],
});

export const runAgent = async (input) => {
  const response = await run(agent, input);

  return response.finalOutput;
};
