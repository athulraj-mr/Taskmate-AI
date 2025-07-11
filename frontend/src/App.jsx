import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchTasks, createTask, editTask, deleteTask } from "./features/task/taskSlice";

function App() {
  const dispatch = useDispatch();
  const { tasks = [], loading, error } = useSelector((state) => state.task);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("Low");


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
      dispatch(createTask({ title, completed: false, priority }));
      toast.success("Task added successfully!");
      setTitle("");
      setPriority("Low");
    } else {
      toast.error("Task title cannot be empty");
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
      toast.success("Task edited successfully!");
    } else {
      toast.error("Title cannot be empty");
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
    toast.success("Task deleted!");
    }
  };

  return (
    <div className="p-5 m-12 max-w-3xl mx-auto bg-[#f2fdf2] shadow-2xl">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">TaskMate AI</h1>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setFilter("all")} 
            className="px-2 py-1 hover:bg-[#8b84eb] rounded text-white bg-[#5639fa]">
            {loading ? "Loading..." : "All"}
          </button>
          <button onClick={() => setFilter("completed")} 
            className="px-2 py-1 hover:bg-[#83ec83] rounded text-white bg-[#24ce24]">
            {loading ? "Loading..." : "Completed"}
          </button>
          <button onClick={() => setFilter("incomplete")}
            className="px-2 py-1 hover:bg-[#eb84e6] rounded text-white bg-[#da34da]">
            {loading ? "loading..." : "Incomplete"}
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
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border rounded px-1 w-16">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button 
          onClick={handleAddTask} 
          className={`px-4 py-1 rounded w-34 text-white hover:bg-[#0000ff] 
            ${loading ? "bg-gray-400" : "bg-[#3939fa]"}`}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      <div>
        <p className="mb-2 ml-1 font-semibold">
          #{tasks.filter(task => !task.completed).length} Tasks Remaining
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
        {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-4">
          <div className="w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full 
            animate-spin"></div>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className={`p-2 rounded shadow mb-2 flex justify-between
            ${task.priority === "High" ? "text-red-500" : 
              task.priority === "Medium" ? "text-[#1c90dd]" : "text-black"}`}>
            {task.title}
            <div className="flex gap-2">
              <button 
                onClick={()=> handleToggleComplete(task)}
                className={`bg-[#45d421] text-white px-2 py-1 rounded 
                  ${task.completed ? "bg-[#54cc2c] hover:bg-[#84eb89]" : "bg-[#da34da] hover:bg-[#eb84d5]"}`}>
                  {task.completed ? "Completed" : "Not Complete"}
              </button>
              <button
                onClick={() => handleEditTask(task)}
                className={`px-2 py-1 hover:bg-[#84d3eb] rounded text-white ${loading ? "bg-gray-400" : "bg-[#0c91b9]"}`}>
                {loading ? "loading..." : "Edit"}
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className={`px-2 py-1 hover:bg-[#eb8484] rounded text-white ${loading ? "bg-gray-400" : "bg-[#fd4040]"}`}>
                {loading ? "loading..." : "Delete"}
              </button>
            </div>
          </div>
        ))
      )}
      <ToastContainer position="top-right" autoClose={3000} theme="light" newestOnTop />
    </div>
  );
}

export default App;