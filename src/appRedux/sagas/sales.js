
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    getProfomaByDateFromApi, getProfomaByDateCustomerFromApi,
    getProfomaByCustomerFromApi, CreateProfoma, ChangeProfoma, RemoveProfoma,
    CreateSales, getProfomaPendingFromApi,
    getBillsDueFromApi, getTopCustomerFromApi, getPerodicSalesFromApi,
    CreateCash, getSalesListsFromApi, getSalesListsByDateFromApi, getSalesListsByCustomerFromApi,
    getSalesListsByDateCustomerFromApi, getCashListsByDateFromApi,
} from "../api/sales"

import {
    successGetProfoma, successSaveProfoma, successUpdateProfoma, successDeleteProfoma, successGetMonthSales,
    successSaveSales, successGetSales, successGetBillDue, successGetTopCustomer, successSaveCashTrans,
    successGetSalesLists, successGetCashTrans,
} from "../Actions/sales"

import {
    REQUEST_GET_PROFOMA, REQUEST_UPDATE_PROFOMA, REQUEST_SAVE_PROFOMA, REQUEST_DELETE_PROFOMA, REQUEST_GET_MONTHSALES,
    REQUEST_SAVE_SALES, REQUEST_GET_SALES, REQUEST_GET_BILLDUE, REQUEST_GET_TOPCUSTOMER, REQUEST_SAVE_CASHTRANS, REQUEST_GET_SALESLISTS,
    REQUEST_GET_CASHTRANS,
} from "../Actions/constants"

import openNotificationWithIcon from 'components/Alert/notification';
import { hideAuthLoader, hideModal } from "../Actions/common"

/* 
function* GetProfomaHandler({ payload }) {
    let sos = yield call(getProfomaFromApi, sessionStorage.getItem('token'), payload)
    if (sos) {
        if (sos.status === 200) {
            yield put(successGetProfoma({
                profomaLists: sos.data.order,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', sos.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}
 */

function* GetProfomaHandler({ payload }) {
    let sos

    if (payload.from_date && payload.customer_id) {
        sos = yield call(getProfomaByDateCustomerFromApi, sessionStorage.getItem('token'), payload)
    }


    else if (payload.customer_id) {
        sos = yield call(getProfomaByCustomerFromApi, sessionStorage.getItem('token'), payload)
    }
    else if (payload.from_date) {
        sos = yield call(getProfomaByDateFromApi, sessionStorage.getItem('token'), payload)
    }
    else {
        sos = yield call(getProfomaPendingFromApi, sessionStorage.getItem('token'), payload)
    }
    // console.log(sos)
    if (sos) {
        if (sos.status === 200) {
            yield put(successGetProfoma({
                profomaLists: sos.data.stock,
                totalPages: sos.data.totalPages,
                totalItems: sos.data.totalItems,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', sos.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* GetSalesListsHandler({ payload }) {
    let sos

    if (payload.from_date && payload.customer_id) {

        sos = yield call(getSalesListsByDateCustomerFromApi, sessionStorage.getItem('token'), payload)
    }
    else if (payload.customer_id) {

        sos = yield call(getSalesListsByCustomerFromApi, sessionStorage.getItem('token'), payload)
    }
    else if (payload.from_date) {

        sos = yield call(getSalesListsByDateFromApi, sessionStorage.getItem('token'), payload)
    }
    else {

        sos = yield call(getSalesListsFromApi, sessionStorage.getItem('token'), payload)
    }
    // console.log(sos)
    if (sos) {
        if (sos.status === 200) {
            yield put(successGetSalesLists({
                salesRecords: sos.data.sales,
                totalPages: sos.data.totalPages,
                totalItems: sos.data.totalItems,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', sos.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* SaveProfomaHandler({ payload }) {
    // console.log(payload)
    const sos = yield call(CreateProfoma, sessionStorage.getItem('token'), payload)
    // console.log(sos)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successSaveProfoma(sos.data.order))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* UpdateProfomaHandler({ payload }) {
    const sos = yield call(ChangeProfoma, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successUpdateProfoma(sos.data.order))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* DeleteProfomaHandler({ payload }) {
    const sos = yield call(RemoveProfoma, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successDeleteProfoma(sos.data.order))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}


function* SaveSalesHandler({ payload }) {
    //   // console.log(payload)
    const sos = yield call(CreateSales, sessionStorage.getItem('token'), payload)
    //  // console.log(sos)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successSaveSales(sos.data.sale))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}


function* SaveCashHandler({ payload }) {
    //   // console.log(payload)
    const sos = yield call(CreateCash, sessionStorage.getItem('token'), payload)
    //  // console.log(sos)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successSaveCashTrans(sos.data.sale))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* GetSalesHandler({ payload }) {
    let sos
    sos = yield call(getPerodicSalesFromApi, sessionStorage.getItem('token'), payload)
    // console.log(payload, sos)
    yield put(hideAuthLoader())
    if (sos.status === 200) {
        yield put(successGetSales({ salesLists: sos.data.sales, saleDetailsLists: sos.data.saleDetails, }))
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* GetSalesMonthHandler({ payload }) {
    let sos
    sos = yield call(getPerodicSalesFromApi, sessionStorage.getItem('token'), payload)
    // console.log(payload, sos)
    yield put(hideAuthLoader())
    if (sos.status === 200) {
        yield put(successGetMonthSales({ monthSalesLists: sos.data.saleDetails, }))
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}


function* GetBillDueHandler({ payload }) {
    //// console.log(payload)
    const sos = yield call(getBillsDueFromApi, sessionStorage.getItem('token'), payload)
    // // console.log(sos)
    yield put(hideAuthLoader())
    if (sos.status === 200) {
        yield put(successGetBillDue({ billsDueLists: sos.data.debt, }))
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* GetCashTransHandler({ payload }) {
    //// console.log(payload)
    const sos = yield call(getCashListsByDateFromApi, sessionStorage.getItem('token'), payload)
    // // console.log(sos)
    yield put(hideAuthLoader())
    if (sos.status === 200) {
        yield put(successGetCashTrans({ cashLists: sos.data.cash, }))
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* GetTopCustomerHandler({ payload }) {
    // // console.log(payload)
    const sos = yield call(getTopCustomerFromApi, sessionStorage.getItem('token'), payload)
    // console.log(sos)
    yield put(hideAuthLoader())
    if (sos.status === 200) {
        yield put(successGetTopCustomer({ topCustomerLists: sos.data.sales, }))
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}



function* LoadWatchers() {
    yield takeEvery(REQUEST_GET_PROFOMA, GetProfomaHandler)
    yield takeEvery(REQUEST_GET_SALESLISTS, GetSalesListsHandler)
    yield takeEvery(REQUEST_GET_SALES, GetSalesHandler)
    yield takeEvery(REQUEST_GET_MONTHSALES, GetSalesMonthHandler)
    yield takeEvery(REQUEST_GET_BILLDUE, GetBillDueHandler)
    yield takeEvery(REQUEST_GET_TOPCUSTOMER, GetTopCustomerHandler)
    yield takeEvery(REQUEST_GET_CASHTRANS, GetCashTransHandler)
}


export function* ActionWatchers() {
    yield takeEvery(REQUEST_SAVE_PROFOMA, SaveProfomaHandler)
    yield takeEvery(REQUEST_UPDATE_PROFOMA, UpdateProfomaHandler)
    yield takeEvery(REQUEST_DELETE_PROFOMA, DeleteProfomaHandler)
    yield takeEvery(REQUEST_SAVE_SALES, SaveSalesHandler)
    yield takeEvery(REQUEST_SAVE_CASHTRANS, SaveCashHandler)
}

export default function* rootSaga() {
    yield all([
        fork(LoadWatchers),
        fork(ActionWatchers),
    ]);
}