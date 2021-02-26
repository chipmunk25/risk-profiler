
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    getStockByDateFromApi, CreateStock, ChangeStock, RemoveStock,
    getWarehouseFromApi, CreateWarehouse, ChangeWarehouse, RemoveWarehouse,
    getAvailableStockFromApi, getWarehouseStockFromApi, CreateMovement,
    getPendingMovementStockFromApi, getPendingMovementSummaryFromApi,
    CreateMovementAuthorize, CreateStockTransfer, getPendingStockTransferSummaryFromApi,
    CreateStockTransferAuthorize, getPendingStockTransferFromApi, getStockBySupplierFromApi,
    getStockByDateSupplierFromApi,

} from "../api/stocks"

import {
    successGetStock, successSaveStock, successUpdateStock, successDeleteStock,
    successGetWarehouse, successSaveWarehouse, successUpdateWarehouse, successDeleteWarehouse,
    successGetWarehouseStock, successGetAvailableStock, successSaveMovement, successGetPendingMovement,
    successGetPendingMovementSummary, successSaveMovementAuthorized, successSaveStockTransfer,
    successGetPendingStockTransferSummary, successGetPendingStockTransfer,

} from "../Actions/stocks"
//import { successGetProfoma } from "../Actions/sales"
import {
    REQUEST_GET_STOCK, REQUEST_UPDATE_STOCK, REQUEST_SAVE_STOCK, REQUEST_DELETE_STOCK,
    REQUEST_GET_WAREHOUSE, REQUEST_UPDATE_WAREHOUSE, REQUEST_SAVE_WAREHOUSE, REQUEST_DELETE_WAREHOUSE,
    REQUEST_GET_WAREHOUSESTOCK, REQUEST_GET_AVAILABLESTOCK, REQUEST_SAVE_MOVEMENT, REQUEST_GET_PENDINGMOVEMENT,
    REQUEST_GET_PENDINGMOVEMENT_SUMMARY, REQUEST_SAVE_MOVEMENTAUTHORIZED, REQUEST_SAVE_STOCKTRANSFER,
    REQUEST_GET_PENDINGSTOCKTRANSFER_SUMMARY, REQUEST_GET_PENDINGSTOCKTRANSFER,

} from "../Actions/constants"

import openNotificationWithIcon from 'components/Alert/notification';
import { hideAuthLoader, hideModal } from "../Actions/common"

function* GetStockHandler({ payload }) {
    let sos
    if (payload.supplier_id) {
        sos = yield call(getStockBySupplierFromApi, sessionStorage.getItem('token'), payload)
    }
    else if (payload.from_date && payload.supplier_id) {
        sos = yield call(getStockByDateSupplierFromApi, sessionStorage.getItem('token'), payload)
    }
    else {
        sos = yield call(getStockByDateFromApi, sessionStorage.getItem('token'), payload)
    }
    // console.log(sos)
    if (sos) {
        if (sos.status === 200) {
            yield put(successGetStock({
                stockLists: sos.data.stock,
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



function* GetPendingMovementHandler({ payload }) {
    let sos = yield call(getPendingMovementStockFromApi, sessionStorage.getItem('token'), payload)
    if (sos) {
        if (sos.status === 200) {
            yield put(successGetPendingMovement({
                pendingMovementLists: sos.data.stock,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', sos.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}

function* GetPendingStockTransferHandler({ payload }) {
    let sos = yield call(getPendingStockTransferFromApi, sessionStorage.getItem('token'), payload)
    if (sos) {
        if (sos.status === 200) {
            yield put(successGetPendingStockTransfer({
                pendingStockTransferLists: sos.data.stock,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', sos.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}

function* GetPendingMovementSummaryHandler({ payload }) {
    let sos = yield call(getPendingMovementSummaryFromApi, sessionStorage.getItem('token'), payload)
    if (sos) {
        if (sos.status === 200) {
            yield put(successGetPendingMovementSummary({
                pendingMovementSummaryLists: sos.data.stock,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', sos.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}

function* GetPendingStockTransferSummaryHandler({ payload }) {
    let sos = yield call(getPendingStockTransferSummaryFromApi, sessionStorage.getItem('token'), payload)
    // console.log(sos)
    if (sos) {
        if (sos.status === 200) {
            yield put(successGetPendingStockTransferSummary({
                pendingStockTransferSummaryLists: sos.data.stock,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', sos.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* GetAvailableStockHandler({ payload }) {
    let sos = yield call(getAvailableStockFromApi, sessionStorage.getItem('token'), payload)
    if (sos) {
        if (sos.status === 200) {
            yield put(successGetAvailableStock({
                availableLists: sos.data.stock,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', sos.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}



function* GetWarehouseStockHandler({ payload }) {
    let sos = yield call(getWarehouseStockFromApi, sessionStorage.getItem('token'), payload)
    if (sos) {
        if (sos.status === 200) {
            yield put(successGetWarehouseStock({
                warehouseLists: sos.data.warehouse,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', sos.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* SaveStockHandler({ payload }) {
    // console.log(payload)
    const sos = yield call(CreateStock, sessionStorage.getItem('token'), payload)
    // console.log(sos)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successSaveStock(sos.data.stock))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* SaveMovementHandler({ payload }) {
    // console.log(payload)
    const sos = yield call(CreateMovement, sessionStorage.getItem('token'), payload)
    // console.log(sos)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successSaveMovement(sos.data.stock))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* SaveStockTransferHandler({ payload }) {
    // console.log(payload)
    const sos = yield call(CreateStockTransfer, sessionStorage.getItem('token'), payload)
    // console.log(sos)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successSaveStockTransfer(sos.data.stock))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* SaveMovementAuthorizeHandler({ payload }) {
    // console.log(payload)
    let sos;
    if (payload.movement) {
        sos = yield call(CreateMovementAuthorize, sessionStorage.getItem('token'), payload)
    } else {
        // console.log('action active')
        sos = yield call(CreateStockTransferAuthorize, sessionStorage.getItem('token'), payload)
    }
    // console.log(sos)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successSaveMovementAuthorized([...sos.data.stock]))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* UpdateStockHandler({ payload }) {
    const sos = yield call(ChangeStock, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successUpdateStock(sos.data.stock))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* DeleteStockHandler({ payload }) {
    const sos = yield call(RemoveStock, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successDeleteStock(sos.data.stock))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}


function* GetWarehouseHandler({ payload }) {
    let sos = yield call(getWarehouseFromApi, sessionStorage.getItem('token'), payload)
    if (sos) {
        if (sos.status === 200) {
            yield put(successGetWarehouse({
                warehouseLists: sos.data.warehouse,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', sos.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* SaveWarehouseHandler({ payload }) {
    // console.log(payload)
    const sos = yield call(CreateWarehouse, sessionStorage.getItem('token'), payload)
    // console.log(sos)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successSaveWarehouse(sos.data.warehouse))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* UpdateWarehouseHandler({ payload }) {
    const sos = yield call(ChangeWarehouse, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successUpdateWarehouse(sos.data.warehouse))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* DeleteWarehouseHandler({ payload }) {
    const sos = yield call(RemoveWarehouse, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (sos.status === 201) {
        yield put(successDeleteWarehouse(sos.data.warehouse))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', sos.error)
    }
}

function* LoadWatchers() {
    yield takeEvery(REQUEST_GET_STOCK, GetStockHandler)
    // yield takeEvery(REQUEST_GET_PROFOMA, GetProfomaHandler)
    yield takeEvery(REQUEST_GET_WAREHOUSE, GetWarehouseHandler)
    yield takeEvery(REQUEST_GET_WAREHOUSESTOCK, GetWarehouseStockHandler)
    yield takeEvery(REQUEST_GET_AVAILABLESTOCK, GetAvailableStockHandler)
    yield takeEvery(REQUEST_GET_PENDINGMOVEMENT, GetPendingMovementHandler)
    yield takeEvery(REQUEST_GET_PENDINGSTOCKTRANSFER, GetPendingStockTransferHandler)
    yield takeEvery(REQUEST_GET_PENDINGMOVEMENT_SUMMARY, GetPendingMovementSummaryHandler)
    yield takeEvery(REQUEST_GET_PENDINGSTOCKTRANSFER_SUMMARY, GetPendingStockTransferSummaryHandler)
}

export function* ActionWatchers() {
    yield takeEvery(REQUEST_SAVE_MOVEMENT, SaveMovementHandler)
    yield takeEvery(REQUEST_SAVE_STOCKTRANSFER, SaveStockTransferHandler)
    yield takeEvery(REQUEST_SAVE_MOVEMENTAUTHORIZED, SaveMovementAuthorizeHandler)
    yield takeEvery(REQUEST_SAVE_STOCK, SaveStockHandler)
    yield takeEvery(REQUEST_UPDATE_STOCK, UpdateStockHandler)
    yield takeEvery(REQUEST_DELETE_STOCK, DeleteStockHandler)
    yield takeEvery(REQUEST_SAVE_WAREHOUSE, SaveWarehouseHandler)
    yield takeEvery(REQUEST_UPDATE_WAREHOUSE, UpdateWarehouseHandler)
    yield takeEvery(REQUEST_DELETE_WAREHOUSE, DeleteWarehouseHandler)
}

export default function* rootSaga() {
    yield all([
        fork(LoadWatchers),
        fork(ActionWatchers),
    ]);
}