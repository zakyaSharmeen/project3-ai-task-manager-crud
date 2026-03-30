// Created storage → tasks = [] (array to store tasks)
// Created ID counter → id = 1 (auto-increment)
// getTasks() → returns all tasks
// addTask(text) → creates new task + adds to array
// updateTask(id, text) → finds task & updates text
// deleteTask(id) → removes task from array

let tasks = [];
let id = 1;

export const getTasks = () => tasks;

export const addTask = (text) => {
  const newTask = { id: id++, text };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (id, text) => {
  // id = Number(id);
  const task = tasks.find((t) => t.id === id);
  if (task) task.text = text;
  return task;
};

export const deleteTask = (id) => {
  tasks = tasks.filter((t) => t.id !== id);
};
