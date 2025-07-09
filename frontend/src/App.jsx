import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, createTask, editTask, deleteTask } from "./features/task/taskSlice";

function App() {
  const dispatch = useDispatch();
  const { tasks = [], loading, error } = useSelector((state) => state.task);
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
    if (!task || !task.id) return alert("Invalid Task");

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
    if (!task || !task.id) return alert("Invalid Task");

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
    <div className="p-5 m-12 max-w-3xl mx-auto bg-[#f2fdf2] shadow-2xl">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">TaskMate AI</h1>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setFilter("all")} 
            className={`px-2 py-1 hover:bg-[#8b84eb] rounded text-white ${loading ? "bg-gray-400" : "bg-[#5639fa]"}`}>
            {loading ? "loading..." : "All"}
          </button>
          <button onClick={() => setFilter("completed")} 
            className={`px-2 py-1 hover:bg-[#83ec83] rounded text-white ${loading ? "bg-gray-400" : "bg-[#24ce24]"}`}>
            {loading ? "loading..." : "Completed"}
          </button>
          <button onClick={() => setFilter("incomplete")}
            className={`px-2 py-1 hover:bg-[#eb84e6] rounded text-white ${loading ? "bg-gray-400" : "bg-[#da34da]"}`}>
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
            ${task.completed ? "bg-[#f1faee]" : "bg-white"}`}>
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
    </div>
  );
}

export default App;