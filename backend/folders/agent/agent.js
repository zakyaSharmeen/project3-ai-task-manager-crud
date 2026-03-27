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
import "dotenv/config";

import { Agent, run } from "@openai/agents";

const agent = new Agent({
  name: "TaskManager",
  model: "gpt-4.1-mini",
  instructions: `
You are an AI task manager agent.

Your job:
- Understand user requests
- Help with tasks (add, update, delete, suggest)
-if the command comes update to the user given so only add the user given task  
- Respond clearly and shortly
- If user gives a task, rephrase it cleanly

Do not give long explanations.
`,
});

export const runAgent = async (input) => {
  const response = await run(agent, input);

  const result = response.finalOutput;

  console.log(
    "🤖 Agent Response::::::::::::::::::::::::::::::::::::::::::::::::::::::::;;:",
    result,
  );

  return result;
};
