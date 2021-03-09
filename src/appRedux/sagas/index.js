import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import statusSagas from "./status";
import peopleSagas from "./people";
import indicatorsSagas from "./indicator";

export default function* rootSaga() {
  yield all([
    authSagas(),
    statusSagas(),
    peopleSagas(),
    indicatorsSagas(),
  ]);
}
