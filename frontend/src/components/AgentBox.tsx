//  “Takes user input, sends it to an AI backend via Axios, displays the response, and reloads the app.”

import { useState } from "react";
import axios from "axios";

// ✅ response type
type AgentResponse = {
  result: string;
};

export default function AgentBox() {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const runAgent = async () => {
    console.log("Button clicked"); // add this

    const res = await axios.post<AgentResponse>(
      "http://localhost:5000/tasks/agent",
      {
        prompt: input,
      },
    );
    console.log(res.data); //  add this

    setResponse(res.data.result);

    // // reload to show new task
    window.location.reload();
  };

  return (
    <div className="fixed bottom-5 right-5">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-full cursor-pointer">
          AI BOT
        </button>
      )}

      {open && (
        <div className="bg-white border p-4 w-72 shadow-lg">
          <input
            className="border p-2 w-full mb-2"
            placeholder="Comand with(add/delete/update"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={runAgent}
            className="bg-black text-white px-4 py-2 rounded-full cursor-pointer">
            Run
          </button>

          <p className="mt-2 text-sm">RESPONSE{response}</p>
        </div>
      )}
    </div>
  );
}
