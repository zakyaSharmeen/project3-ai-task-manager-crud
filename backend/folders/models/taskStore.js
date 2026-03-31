//5 thins
// Imports required modules (dotenv, mongoose)
// Defines task schema (text field)
// Creates Task model
// Gets all tasks, add, update, delete from database
// Validates ID before delete

process.env.OPENAI_AGENTS_DISABLE_TRACING = "true";
import dotenv from "dotenv";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  text: String,
});

export const TaskModel = mongoose.model("Task", taskSchema);

export const getTasks = async () => {
  return await TaskModel.find(); //
};

export const addTask = async (text) => {
  const newTask = new TaskModel({ text }); //
  return await newTask.save();
};

export const updateTask = async (id, text) => {
  return await TaskModel.findByIdAndUpdate(id, { text }, { new: true }); //
};

export const deleteTask = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID");
  }

  return await TaskModel.findByIdAndDelete(id); //
};
