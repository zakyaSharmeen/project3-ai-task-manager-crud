// // Created storage → tasks = [] (array to store tasks)
// // Created ID counter → id = 1 (auto-increment)
// // getTasks() → returns all tasks
// // addTask(text) → creates new task + adds to array
// // updateTask(id, text) → finds task & updates text
// // deleteTask(id) → removes task from array

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

export const deleteTask = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID");
  }

  return await Task.findByIdAndDelete(id);
};
