

import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
   
    getStatusFromApi, CreateStatus, ChangeStatus, RemoveStatus,
  
} from "../api/status"

import {
    successGetStatus, successSaveStatus, successUpdateStatus, successDeleteStatus,
   
} from "../Actions/status"

import {
  
    REQUEST_GET_STATUS, REQUEST_UPDATE_STATUS, REQUEST_SAVE_STATUS, REQUEST_DELETE_STATUS,
   
} from "../Actions/constants"

import openNotificationWithIcon from 'components/Alert/notification';
import { hideAuthLoader, hideModal } from "../Actions/common"
function* GetStatusHandler({ payload }) {
    let statuses = yield call(getStatusFromApi, sessionStorage.getItem('token'), payload)
    // // console.log(statuses)
    if (statuses) {
        if (statuses.status === 200) {
            yield put(successGetStatus({
                statusLists: statuses.data.statuses,
            }));
            yield put(hideAuthLoader())
        }
        else {
            openNotificationWithIcon('error', 'Error', statuses.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* SaveStatusHandler({ payload }) {
    const statuses = yield call(CreateStatus, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (statuses.status === 201) {
        yield put(successSaveStatus(statuses.data.statuses))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    } else if (statuses.status === 422) {
        openNotificationWithIcon('error', 'Error', statuses.data.message)
    }
    else {
        openNotificationWithIcon('error', 'Error', statuses.error)
    }
}

function* UpdateStatusHandler({ payload }) {
    const statuses = yield call(ChangeStatus, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (statuses.status === 201) {
        yield put(successUpdateStatus(statuses.data.statuses))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', statuses.error)
    }
}

function* DeleteStatusHandler({ payload }) {
    const statuses = yield call(RemoveStatus, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (statuses.status === 201) {
        yield put(successDeleteStatus(statuses.data.statuses))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', statuses.error)
    }
}


function* LoadWatchers() {
    yield takeEvery(REQUEST_GET_STATUS, GetStatusHandler)
}


export function* ActionWatchers() {
   
    yield takeEvery(REQUEST_SAVE_STATUS, SaveStatusHandler)
    yield takeEvery(REQUEST_UPDATE_STATUS, UpdateStatusHandler)
    yield takeEvery(REQUEST_DELETE_STATUS, DeleteStatusHandler)

   
}
 
export default function* rootSaga() {
    yield all([
        fork(LoadWatchers),
        fork(ActionWatchers),
    ]);
}

