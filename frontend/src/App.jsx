import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask, editTask, deleteTask } from "./features/task/taskSlice";

function App() {
  const dispatch = useDispatch();
  const { tasks = [], loading } = useSelector((state) => state.task);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });


  const handleAddTask = () => {
    if (title.trim() !== "") {
      dispatch(createTask({ title, completed: false }));
      setTitle("");
    }
  };

  const handleEditTask = (task)=> { 
    const newTitle = prompt("New title", task.title);
    if (newTitle !== null && newTitle.trim() !== "") {
      dispatch(editTask({
        id: task.id,
        updatedData: {
          title: newTitle,
          completed: task.completed,
        }
      }));
    }
  };

  const handleToggleComplete = (task) => {
    dispatch(editTask({
      id: task.id,
      updatedData: {
        title: task.title,
        completed: !task.completed,
      }
    }));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
    dispatch(deleteTask(taskId));
    }
  };

  return (
    <div className="p-5 m-12 max-w-2xl mx-auto bg-[#f1faee] shadow-2xl">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">TaskMate AI</h1>
        <div className="flex gap-2 mb-4">
          <button onClick={() => setFilter("all")} 
            className="px-2 py-1 rounded bg-[#6565f8] text-white">
            All
          </button>
          <button onClick={() => setFilter("completed")} 
            className="px-2 py-1 rounded bg-[#24ce24] text-white">
            Completed
          </button>
          <button onClick={() => setFilter("incomplete")} 
            className="px-2 py-1 rounded bg-[#da34da] text-white">
            Incomplete
          </button>
        </div>
      </div>
      <div className="flex gap-2 pt-3 pb-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
          className="border rounded px-2 w-full"
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-1 rounded">
          Add
        </button>
      </div>
      <div>
        <p className="mb-2 ml-1 font-semibold">
          #{tasks.filter(task => !task.completed).length} Tasks Remaining
        </p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className={`p-2 rounded shadow mb-2 flex justify-between
            ${task.completed ? "bg-[#f1faee]" : "bg-white"}`}>
            {task.title}
            <div className="flex gap-2">
              <button 
                onClick={()=> handleToggleComplete(task)}
                className={`bg-[#45d421] text-white px-2 py-1 rounded 
                  ${task.completed ? "bg-[#54cc2c]" : "bg-[#da34da]"}`}>
                  {task.completed ? "Completed" : "Not Complete"}
              </button>
              <button
                onClick={() => handleEditTask(task)}
                className="bg-[#0c91b9] text-white px-2 py-1 rounded">
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-[#fd4040] text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;