import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import productSagas from "./products";
import peopleSagas from "./people";
import stocksSagas from "./stocks";
import salesSagas from "./sales";
import ledgersSagas from "./ledgers";
import indicatorsSagas from "./indicator";

export default function* rootSaga() {
  yield all([
    authSagas(),
    productSagas(),
    peopleSagas(),
    stocksSagas(),
    salesSagas(),
    ledgersSagas(),
    indicatorsSagas(),
  ]);
}
