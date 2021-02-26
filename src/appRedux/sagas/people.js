

import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    getCustomerFromApi, CreateCustomer, ChangeCustomer, RemoveCustomer,
    getSupplierFromApi, CreateSupplier, ChangeSupplier, RemoveSupplier,
} from "../api/people"

import {
    successGetCustomer, successSaveCustomer, successUpdateCustomer, successDeleteCustomer,
    successGetSupplier, successSaveSupplier, successUpdateSupplier, successDeleteSupplier,
} from "../Actions/people"

import {
    REQUEST_GET_CUSTOMER, REQUEST_UPDATE_CUSTOMER, REQUEST_SAVE_CUSTOMER, REQUEST_DELETE_CUSTOMER,
    REQUEST_GET_SUPPLIER, REQUEST_UPDATE_SUPPLIER, REQUEST_SAVE_SUPPLIER, REQUEST_DELETE_SUPPLIER,
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


function* GetSupplierHandler({ payload }) {
    let people = yield call(getSupplierFromApi, sessionStorage.getItem('token'), payload)
    if (people) {
        if (people.status === 200) {
            yield put(successGetSupplier({
                supplierLists: people.data.supplier,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', people.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* SaveSupplierHandler({ payload }) {
    // console.log(payload)
    const people = yield call(CreateSupplier, sessionStorage.getItem('token'), payload)
    // console.log(people)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (people.status === 201) {
        yield put(successSaveSupplier(people.data.supplier))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }else if (people.status === 422) {
        openNotificationWithIcon('error', 'Error', people.data.message)
    }
    else {
        openNotificationWithIcon('error', 'Error', people.error)
    }
}

function* UpdateSupplierHandler({ payload }) {
    const people = yield call(ChangeSupplier, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (people.status === 201) {
        yield put(successUpdateSupplier(people.data.supplier))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', people.error)
    }
}

function* DeleteSupplierHandler({ payload }) {
    const people = yield call(RemoveSupplier, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (people.status === 201) {
        yield put(successDeleteSupplier(people.data.supplier))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', people.error)
    }
}



function* LoadWatchers() {
    yield takeEvery(REQUEST_GET_CUSTOMER, GetCustomerHandler)
    yield takeEvery(REQUEST_GET_SUPPLIER, GetSupplierHandler)
}


export function* ActionWatchers() {
    yield takeEvery(REQUEST_SAVE_CUSTOMER, SaveCustomerHandler)
    yield takeEvery(REQUEST_UPDATE_CUSTOMER, UpdateCustomerHandler)
    yield takeEvery(REQUEST_DELETE_CUSTOMER, DeleteCustomerHandler)

    yield takeEvery(REQUEST_SAVE_SUPPLIER, SaveSupplierHandler)
    yield takeEvery(REQUEST_UPDATE_SUPPLIER, UpdateSupplierHandler)
    yield takeEvery(REQUEST_DELETE_SUPPLIER, DeleteSupplierHandler)


}

export default function* rootSaga() {
    yield all([
        fork(LoadWatchers),
        fork(ActionWatchers),
    ]);
}

