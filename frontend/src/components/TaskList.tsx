import { useEffect, useState } from "react";
import axios from "axios";

type Task = {
  _id: string;
  text: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  // ✅ FETCH
  const fetchTasks = async () => {
    try {
      const res = await axios.get<Task[]>("http://localhost:5000/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ DELETE
  const deleteTask = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${_id}`);
      fetchTasks();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ✅ START EDIT
  const startEdit = (task: Task) => {
    setEditId(task._id);
    setEditText(task.text);
  };

  // ✅ UPDATE
  const updateTask = async () => {
    try {
      await axios.put(`http://localhost:5000/tasks/${editId}`, {
        text: editText,
      });
      setEditId(null);
      setEditText("");
      fetchTasks();
    } catch (err) {
      console.error("update failed", err);
    }
  };

  return (
    <div>
      {tasks.map((t) => (
        <div key={t._id} className="border p-2 mb-2 flex gap-2 justify-center">
          {editId === t._id ? (
            <>
              <input
                className="border p-1"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button
                onClick={updateTask}
                className="bg-green-500 text-white px-8 py-2 rounded-full">
                Save
              </button>
            </>
          ) : (
            <>
              <span className="flex-1">{t.text}</span>

              <button
                onClick={() => startEdit(t)}
                className="bg-yellow-500 text-white px-8 py-2 rounded-full">
                Edit
              </button>

              <button
                onClick={() => deleteTask(t._id)}
                className="bg-red-500 text-white px-8 py-2 rounded-full">
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
