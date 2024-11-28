import { useEffect, useState } from "react";
import Search from "./Components/Search";
import Task from "./Components/Task";
import axios from "axios";

type TasksProps = {
  _id: number;
  task: string;
  complete: boolean;
};
type TaskP = {
  task: string;
  complete: boolean;
};
function App() {
  const [tasks, setTasks] = useState<TasksProps[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/projects")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const addTask = (newTask: TasksProps) => {
    setTasks((prevTask) => [...prevTask, newTask]);
  };
  const editTask = (id: number, updatedTask: TaskP) => {
    axios
      .put("http://localhost:3001/api/projects/" + id, updatedTask)
      .then(() => {
        setTasks((prevTask) =>
          prevTask.map((t) => (t._id === id ? { ...t, ...updatedTask } : t))
        );
      })
      .catch((err) => console.error(err));
  };
  const deleteTask = (id: number) => {
    axios
      .delete("http://localhost:3001/api/projects/" + id)
      .then(() => {
        setTasks((prevTask) => prevTask.filter((t) => t._id !== id));
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="bg-gray-100 w-screen min-h-screen px-4 py-[3rem]">
      <div className="max-w-[540px] mx-auto">
        <h1 className="text-violet-700 font-bold text-4xl mb-[2rem] cursor-pointer">
          Code<span className="text-purple-500">Craft</span>
        </h1>
        <p className="text-gray-700 font-normal text-lg  mb-4">
          What are your plans today?
        </p>
        <Search onAddTask={addTask} />
        <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2">
          {tasks.map((data) => (
            <Task
              key={data._id}
              id={data._id}
              task={data.task}
              complete={data.complete}
              onEdit={editTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
