// // Created storage → tasks = [] (array to store tasks)
// // Created ID counter → id = 1 (auto-increment)
// // getTasks() → returns all tasks
// // addTask(text) → creates new task + adds to array
// // updateTask(id, text) → finds task & updates text
// // deleteTask(id) → removes task from array

// let tasks = [];
// let id = 1;

// export const getTasks = () => tasks;

// export const addTask = (text) => {
//   const newTask = { id: id++, text };
//   tasks.push(newTask);
//   return newTask;
// };

// export const updateTask = (id, text) => {
//   // id = Number(id);
//   const task = tasks.find((t) => t.id === id);
//   if (task) task.text = text;
//   return task;
// };

// export const deleteTask = (id) => {
//   tasks = tasks.filter((t) => t.id !== id);
// };
process.env.OPENAI_AGENTS_DISABLE_TRACING = "true";
import dotenv from "dotenv";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  text: String,
});

export const Task = mongoose.model("Task", taskSchema);

export const getTasks = async () => {
  return await Task.find();
};

export const addTask = async (text) => {
  const newTask = new Task({ text });
  return await newTask.save();
};

export const updateTask = async (id, text) => {
  return await Task.findByIdAndUpdate(id, { text }, { new: true });
};

// export const deleteTask = async (id) => {
//   return await Task.findByIdAndDelete(id);
// };

// export const deleteTask = async (_id) => {
//   console.log("DELETE ID:", _id);

//   if (!mongoose.Types.ObjectId.isValid(_id)) {
//     throw new Error("Invalid ID");
//   }

//   return await Task.findByIdAndDelete(_id);
// };

export const deleteTask = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID");
  }

  return await Task.findByIdAndDelete(id);
};
