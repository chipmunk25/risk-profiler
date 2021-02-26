import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    getIndicatorTypeFromApi, CreateIndicatorType, ChangeIndicatorType, RemoveIndicatorType,
} from "../api/indicator"

import {
    successGetIndicatorType, successSaveIndicatorType, successUpdateIndicatorType, successDeleteIndicatorType
} from "../Actions/indicator"
import {
    REQUEST_GET_INDICATORTYPE, REQUEST_SAVE_INDICATORTYPE, REQUEST_UPDATE_INDICATORTYPE, REQUEST_DELETE_INDICATORTYPE
} from "../Actions/constants"


import openNotificationWithIcon from 'components/Alert/notification';
import { hideAuthLoader, hideModal } from "../Actions/common"

function* GetIndicatorTypeHandler({ payload }) {
    let indicator;

    indicator = yield call(getIndicatorTypeFromApi, sessionStorage.getItem('token'), payload)

    yield put(hideAuthLoader())
    if (indicator.status === 200) {
        yield put(successGetIndicatorType({ indicatorTypeLists: indicator.data.indicators }))
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* SaveIndicatorTypeHandler({ payload }) {
    const indicators = yield call(CreateIndicatorType, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successSaveIndicatorType(indicators.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* UpdateIndicatorTypeHandler({ payload }) {
    const indicators = yield call(ChangeIndicatorType, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successUpdateIndicatorType(indicators.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* DeleteIndicatorTypeHandler({ payload }) {
    const indicator = yield call(RemoveIndicatorType, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicator.status === 201) {
        yield put(successDeleteIndicatorType(indicator.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* LoadWatchers() {
    yield takeEvery(REQUEST_GET_INDICATORTYPE, GetIndicatorTypeHandler)
}


export function* ActionWatchers() {
    yield takeEvery(REQUEST_SAVE_INDICATORTYPE, SaveIndicatorTypeHandler)
    yield takeEvery(REQUEST_UPDATE_INDICATORTYPE, UpdateIndicatorTypeHandler)
    yield takeEvery(REQUEST_DELETE_INDICATORTYPE, DeleteIndicatorTypeHandler)

}

export default function* rootSaga() {
    yield all([
        fork(LoadWatchers),
        fork(ActionWatchers),
    ]);
}