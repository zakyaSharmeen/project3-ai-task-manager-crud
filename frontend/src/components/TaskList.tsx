import { useEffect, useState } from "react";
import axios from "axios";

type Task = {
  id: number;
  text: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const fetchTasks = () => {
    axios
      .get<Task[]>("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ DELETE
  const deleteTask = async (id: number) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  // ✅ START EDIT
  const startEdit = (task: Task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  // ✅ UPDATE
  const updateTask = async () => {
    await axios.put(`http://localhost:5000/tasks/${editId}`, {
      text: editText,
    });
    setEditId(null);
    setEditText("");
    fetchTasks();
  };

  return (
    <div>
      {tasks.map((t) => (
        <div key={t.id} className="border p-2 mb-2 flex gap-2">
          {editId === t.id ? (
            <>
              <input
                className="border p-1"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button
                onClick={updateTask}
                className="bg-green-500 text-white px-2">
                Save
              </button>
            </>
          ) : (
            <>
              <span className="flex-1">{t.text}</span>

              <button
                onClick={() => startEdit(t)}
                className="bg-yellow-500 text-white px-2">
                Edit
              </button>

              <button
                onClick={() => deleteTask(t.id)}
                className="bg-red-500 text-white px-2">
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
