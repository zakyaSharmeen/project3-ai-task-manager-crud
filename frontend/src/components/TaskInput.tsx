import { useState } from "react";
import axios from "axios";

export default function TaskInput() {
  const [text, setText] = useState<string>(""); // ✅ type added

  const addTask = async () => {
    if (!text.trim()) {
      alert("PLEASE ENTER A TASK");
      return;
    }
    await axios.post("http://localhost:5000/tasks", { text });
    window.location.reload();
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 w-full"
        placeholder="Add a task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={addTask}
        className="bg-black text-white px-8 rounded-full">
        Add
      </button>
    </div>
  );
}
