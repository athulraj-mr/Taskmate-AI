import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState:{
        tasks: [],
        loading: false,
    },
    reducers: {
        fetchTasks: (state)=> {
            state.loading = true;
        },
        setTasks: (state, action)=> {
            state.tasks = action.payload;
            state.loading = false;
        },
        createTask: (state)=> {
            state.loading = true;
        },
        addTask: (state, action)=> {
            state.tasks.push(action.payload);
            state.loading = false;
        },
        editTask: (state)=> {
            state.loading = true;
        },
        updateTask: (state, action)=> {
            const updatedTask = action.payload;
            const index = state.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                state.tasks[index] = updatedTask;
            }
            state.loading = false;
        },
        deleteTask: (state)=> {
            state.loading = true;
        },
        deleteTaskFromState: (state,action)=> {
            const taskId = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== taskId);
            state.loading = false;
        },
    },
});

export const { fetchTasks, setTasks, createTask, addTask, editTask, updateTask,
    deleteTask, deleteTaskFromState
} = taskSlice.actions;
export default taskSlice.reducer;