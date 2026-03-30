import TaskInput from "./components/TaskInput.tsx";
import TaskList from "./components/TaskList.tsx";
import AgentBox from "./components/AgentBox.tsx";
import "./App.css";
function App() {
  return (
    <div className="w-1/2 mx-auto mt-10 p-6 border-black border-2 rounded-lg shadow">
      <TaskInput />
      <TaskList />
      <AgentBox />
    </div>
  );
}

export default App;

////////////////////////////////////////////////////////////////////////////////////////////////////
