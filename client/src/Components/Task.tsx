import { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck as regularCheck,
} from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck as filledCheck, faTrashCan, } from "@fortawesome/free-solid-svg-icons";

type TaskProps = {
  id: number
  task: string
  complete: boolean
  onEdit: (id: number, updatedTask: { task: string; complete: boolean }) => void;
  onDelete: (id: number) => void;
}
function Task({id, task, complete, onEdit, onDelete}: TaskProps) {
  const color = useMemo (() => ["bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-violet-500", "bg-purple-500"],[]); 
  const [randomColor, setRandomColor] = useState("");
  const [done, setDone] = useState(false);
  
  useEffect(() =>{
    const random = Math.floor(Math.random() * color.length);
    setRandomColor(color[random]);
  }, [color]);

  useEffect(()=>{
    setDone(complete);
  },[complete]);

  const handleEdit = (id:number) =>{
    const newDoneStatus = !done;
    setDone(newDoneStatus);
    onEdit(id, { task, complete: newDoneStatus });
  }
  const handleDelete = (id:number) =>{
    onDelete(id);
  }
  return (
    <div className={`${randomColor} rounded-lg p-3 flex max-h-36  text-white items-start col-span-1 shadow break-words`}>
      <div className="container flex items-center justify-between  gap-2">
        <div
          className="cursor-pointer text-lg flex gap-2 items-center hover:text-gray-200"
          onClick={() => handleEdit(id)}
        >
          <FontAwesomeIcon icon={done ? filledCheck : regularCheck} />
          <p className={`${done ? "line-through" : ""} text-sm break-all`}>
            {task}
          </p>
        </div>
        <FontAwesomeIcon icon={faTrashCan} className="cursor-pointer text-gray-200 hover:text-red-600" onClick={() => handleDelete(id)}/>
      </div>
    </div>
  );
}

export default Task;
