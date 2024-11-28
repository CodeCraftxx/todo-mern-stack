import {useState } from "react";
import axios from 'axios';

type TaskProps = {
  _id: number
  task: string
  complete: boolean
}
type SearchProps = {
  onAddTask: (task: TaskProps) => void; 
}
function Search({onAddTask}: SearchProps) {
  const [task, setTask] = useState("");
  const url = "https://todo-backend-62oy.onrender.com/api/projects/"

  // Algo
  const handleSend = () =>{
    if(task === "") return;
    axios.post(url,{
      task: task,
      complete: false
    })
    .then((res) => {
      onAddTask(res.data);
      setTask("");
    })
    .catch(err => console.error(err));
  }
  return (
    <div className="grid grid-cols-5 gap-4">
      <input
        className="px-4 py-2 rounded shadow-sm border col-span-4"
        type="text"
        placeholder="New task..."
        maxLength={120}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter")
              handleSend();
          }}
      />
      <button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded" onClick={() => handleSend()}>
        Add
      </button>
    </div>
  );
}

export default Search;
