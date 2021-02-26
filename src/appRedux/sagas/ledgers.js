import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    getLedgerHeadFromApi, getLedgerFromApi, CreateLedger,ChangeLedger,
} from "../api/ledgers"

import {
    successGetLedgerHead, successGetLedger, successSaveLedger,successUpdateLedger,
} from "../Actions/ledgers"
import {
    REQUEST_GET_LEDGERHEAD, REQUEST_GET_LEDGER, REQUEST_SAVE_LEDGER,REQUEST_UPDATE_LEDGER,
} from "../Actions/constants"


import openNotificationWithIcon from 'components/Alert/notification';
import { hideAuthLoader, hideModal } from "../Actions/common"

function* GetAcHeadHandler({ payload }) {
    let ledger;

    ledger = yield call(getLedgerHeadFromApi, sessionStorage.getItem('token'), payload)

    yield put(hideAuthLoader())
    if (ledger.status === 200) {
        yield put(successGetLedgerHead({ acheadLists: ledger.data.ledgers }))
    }
    else {
        openNotificationWithIcon('error', 'Error', ledger.error)
    }
}

function* GetLedgersHandler({ payload }) {
    let ledger;

    ledger = yield call(getLedgerFromApi, sessionStorage.getItem('token'), payload)
    // console.log(payload, ledger)
    yield put(hideAuthLoader())
    if (ledger.status === 200) {
        yield put(successGetLedger({ ledgerLists: ledger.data.ledgers }))
    }
    else {
        openNotificationWithIcon('error', 'Error', ledger.error)
    }
}

function* SaveLedgerHandler({ payload }) {
    // console.log(payload)
    const ledgers = yield call(CreateLedger, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (ledgers.status === 201) {
        yield put(successSaveLedger(ledgers.data.ledger))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', ledgers.error)
    }
}

function* UpdateLedgerHandler({ payload }) {
    // console.log(payload)
    const ledgers = yield call(ChangeLedger, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (ledgers.status === 201) {
        yield put(successUpdateLedger(ledgers.data.ledger))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', ledgers.error)
    }
}


function* LoadWatchers() {
    yield takeEvery(REQUEST_GET_LEDGER, GetLedgersHandler)
    yield takeEvery(REQUEST_GET_LEDGERHEAD, GetAcHeadHandler)
}


export function* ActionWatchers() {
    yield takeEvery(REQUEST_SAVE_LEDGER, SaveLedgerHandler)
    yield takeEvery(REQUEST_UPDATE_LEDGER, UpdateLedgerHandler)
     /*   yield takeEvery(REQUEST_DELETE_LEDGER, DeleteProfomaHandler)
      yield takeEvery(REQUEST_SAVE_SALES, SaveSalesHandler)*/
}

export default function* rootSaga() {
    yield all([
        fork(LoadWatchers),
        fork(ActionWatchers),
    ]);
}