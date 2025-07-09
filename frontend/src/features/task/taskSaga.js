import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { fetchTasks, setTasks, createTask, addTask, updateTask, editTask,
  deleteTask, deleteTaskFromState
 } from "./taskSlice";

function* fetchTasksWorker() {
  try {
    const response = yield call(() =>
      axios.get("http://127.0.0.1:8000/tasks")
    );
    yield put(setTasks(response.data));
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  }
}

function* createTaskWorker(action) {
  try {
    const response = yield call(()=> 
      axios.post("http://127.0.0.1:8000/tasks", action.payload)
    );
    yield put(addTask(response.data));
  } catch (error) {
    console.error("create failed", error);
  }
}

function* updateTaskWorker(action) {
  try {
    const { id, updatedData } = action.payload;
    const response = yield call(() =>
      axios.put(`http://127.0.0.1:8000/tasks/${id}`, updatedData)
    );
    yield put(updateTask(response.data));
  } catch (error) {
    console.error("Update failed:", error);
  }
}

function* deleteTaskWorker(action) {
  try {
    const id = action.payload;
    yield call(()=> axios.delete(`http://127.0.0.1:8000/tasks/${id}`));
    yield put(deleteTaskFromState(id));
  } catch (error) {
    console.error("Delete failed:", error);
  }
}

export function* taskSaga() {
  yield takeEvery(fetchTasks.type, fetchTasksWorker);
  yield takeEvery(createTask.type, createTaskWorker);
  yield takeEvery(editTask.type, updateTaskWorker);
  yield takeEvery(deleteTask.type, deleteTaskWorker);
}