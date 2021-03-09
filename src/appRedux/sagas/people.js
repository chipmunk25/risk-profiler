

import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    getCustomerFromApi, CreateCustomer, ChangeCustomer, RemoveCustomer,
 
} from "../api/people"

import {
    successGetCustomer, successSaveCustomer, successUpdateCustomer, successDeleteCustomer,
   
} from "../Actions/people"

import {
    REQUEST_GET_CUSTOMER, REQUEST_UPDATE_CUSTOMER, REQUEST_SAVE_CUSTOMER, REQUEST_DELETE_CUSTOMER,
  
} from "../Actions/constants"

import openNotificationWithIcon from 'components/Alert/notification';
import { hideAuthLoader, hideModal } from "../Actions/common"

function* GetCustomerHandler({ payload }) {
    let people = yield call(getCustomerFromApi, sessionStorage.getItem('token'), payload)
    if (people) {
        if (people.status === 200) {
            yield put(successGetCustomer({
                customerLists: people.data.customer,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', people.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* SaveCustomerHandler({ payload }) {
    // console.log(payload)
    const people = yield call(CreateCustomer, sessionStorage.getItem('token'), payload)
    // console.log(people)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (people.status === 201) {
        yield put(successSaveCustomer(people.data.customer))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    } else if (people.status === 422) {
        openNotificationWithIcon('error', 'Error', people.data.message)
    }
    else {
        openNotificationWithIcon('error', 'Error', people.error)
    }
}

function* UpdateCustomerHandler({ payload }) {
    const people = yield call(ChangeCustomer, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (people.status === 201) {
        yield put(successUpdateCustomer(people.data.customer))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', people.error)
    }
}

function* DeleteCustomerHandler({ payload }) {
    const people = yield call(RemoveCustomer, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (people.status === 201) {
        yield put(successDeleteCustomer(people.data.customer))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', people.error)
    }
}


function* LoadWatchers() {
    yield takeEvery(REQUEST_GET_CUSTOMER, GetCustomerHandler)
}


export function* ActionWatchers() {
    yield takeEvery(REQUEST_SAVE_CUSTOMER, SaveCustomerHandler)
    yield takeEvery(REQUEST_UPDATE_CUSTOMER, UpdateCustomerHandler)
    yield takeEvery(REQUEST_DELETE_CUSTOMER, DeleteCustomerHandler)


}

export default function* rootSaga() {
    yield all([
        fork(LoadWatchers),
        fork(ActionWatchers),
    ]);
}

