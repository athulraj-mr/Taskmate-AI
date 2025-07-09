import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState:{
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchTasks: (state)=> {
            state.loading = true;
            state.error = null;
        },
        setTasks: (state, action)=> {
            state.tasks = action.payload;
            state.loading = false;
            state.error = null;
        },
        createTask: (state)=> {
            state.loading = true;
            state.error = null;
        },
        addTask: (state, action)=> {
            state.tasks.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        editTask: (state)=> {
            state.loading = true;
            state.error = null;
        },
        updateTask: (state, action)=> {
            const updatedTask = action.payload;
            const index = state.tasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                state.tasks[index] = updatedTask;
            }
            state.loading = false;
            state.error = null;
        },
        deleteTask: (state)=> {
            state.loading = true;
            state.error = null;
        },
        deleteTaskFromState: (state,action)=> {
            const taskId = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== taskId);
            state.loading = false;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchTasks, setTasks, createTask, addTask, editTask, updateTask,
    deleteTask, deleteTaskFromState, setError
} = taskSlice.actions;
export default taskSlice.reducer;