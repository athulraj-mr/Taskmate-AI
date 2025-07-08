import { all } from "redux-saga/effects";
import { taskSaga } from "../features/task/taskSaga";

export default function* rootSaga() {
  yield all([taskSaga()]);
}
