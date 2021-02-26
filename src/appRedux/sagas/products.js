

import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    getCategoryFromApi, CreateCategory, ChangeCategory, RemoveCategory,
    getUnitFromApi, CreateUnit, ChangeUnit, RemoveUnit,
    getProductFromApi, CreateProduct, ChangeProduct, RemoveProduct,
    getStatusFromApi,CreateMultipleProduct,
} from "../api/products"

import {
    successGetCategory, successSaveCategory, successUpdateCategory, successDeleteCategory,
    successGetUnit, successSaveUnit, successUpdateUnit, successDeleteUnit,
    successGetProduct, successSaveProduct, successUpdateProduct, successDeleteProduct,
    successGetStatus,successSaveBulkProduct,
} from "../Actions/products"

import {
    REQUEST_GET_CATEGORY, REQUEST_UPDATE_CATEGORY, REQUEST_SAVE_CATEGORY, REQUEST_DELETE_CATEGORY,
    REQUEST_GET_UNIT, REQUEST_UPDATE_UNIT, REQUEST_SAVE_UNIT, REQUEST_DELETE_UNIT,
    REQUEST_GET_PRODUCT, REQUEST_UPDATE_PRODUCT, REQUEST_SAVE_PRODUCT, REQUEST_DELETE_PRODUCT,
    REQUEST_GET_STATUS,REQUEST_SAVE_BULKPRODUCT
} from "../Actions/constants"

import openNotificationWithIcon from 'components/Alert/notification';
import { hideAuthLoader, hideModal } from "../Actions/common"

function* GetCategoryHandler({ payload }) {
    let products = yield call(getCategoryFromApi, sessionStorage.getItem('token'), payload)
    if (products) {
        if (products.status === 200) {
            yield put(successGetCategory({
                categoryLists: products.data.category,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', products.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* SaveCategoryHandler({ payload }) {
    const products = yield call(CreateCategory, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (products.status === 201) {
        yield put(successSaveCategory(products.data.category))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    } else if (products.status === 422) {
        openNotificationWithIcon('error', 'Error', products.data.message)
    }
    else {
        openNotificationWithIcon('error', 'Error', products.error)
    }
}

function* UpdateCategoryHandler({ payload }) {
    const products = yield call(ChangeCategory, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (products.status === 201) {
        yield put(successUpdateCategory(products.data.category))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', products.error)
    }
}

function* DeleteCategoryHandler({ payload }) {
    const products = yield call(RemoveCategory, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (products.status === 201) {
        yield put(successDeleteCategory(products.data.category))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', products.error)
    }
}

function* GetUnitHandler({ payload }) {
    let products = yield call(getUnitFromApi, sessionStorage.getItem('token'), payload)
    // // console.log(products)
    if (products) {
        if (products.status === 200) {
            yield put(successGetUnit({
                unitLists: products.data.unit,
            }));
            yield put(hideAuthLoader())
        }
        else {
            openNotificationWithIcon('error', 'Error', products.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* SaveUnitHandler({ payload }) {
    const products = yield call(CreateUnit, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (products.status === 201) {
        yield put(successSaveUnit(products.data.unit))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    } else if (products.status === 422) {
        openNotificationWithIcon('error', 'Error', products.data.message)
    }
    else {
        openNotificationWithIcon('error', 'Error', products.error)
    }
}

function* UpdateUnitHandler({ payload }) {
    const products = yield call(ChangeUnit, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (products.status === 201) {
        yield put(successUpdateUnit(products.data.unit))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', products.error)
    }
}

function* DeleteUnitHandler({ payload }) {
    const products = yield call(RemoveUnit, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (products.status === 201) {
        yield put(successDeleteUnit(products.data.unit))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', products.error)
    }
}

function* GetProductHandler({ payload }) {
    let products = yield call(getProductFromApi, sessionStorage.getItem('token'), payload)
    //  // console.log(products)
    if (products) {
        if (products.status === 200) {
            yield put(successGetProduct({
                productLists: products.data.product,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', products.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}

function* GetStatusHandler({ payload }) {
    let products = yield call(getStatusFromApi, sessionStorage.getItem('token'), payload)
    // console.log(products)
    if (products) {
        if (products.status === 200) {
            yield put(successGetStatus({
                statusLists: products.data.statusLists,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', products.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* SaveProductHandler({ payload }) {
    const products = yield call(CreateProduct, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (products.status === 201) {
        yield put(successSaveProduct(products.data.product))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    } else if (products.status === 422) {
        openNotificationWithIcon('error', 'Error', products.data.message)
    }
    else {
        openNotificationWithIcon('error', 'Error', products.error)
    }
}
function* SaveBulkProductHandler({ payload }) {
    const products = yield call(CreateMultipleProduct, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (products.status === 201) {
        yield put(successSaveBulkProduct(products.data.product))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    } else if (products.status === 422) {
        openNotificationWithIcon('error', 'Error', products.data.message)
    }
    else {
        openNotificationWithIcon('error', 'Error', products.error)
    }
}

function* UpdateProductHandler({ payload }) {
    const products = yield call(ChangeProduct, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (products.status === 201) {
        yield put(successUpdateProduct(products.data.product))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', products.error)
    }
}

function* DeleteProductHandler({ payload }) {
    const products = yield call(RemoveProduct, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (products.status === 201) {
        yield put(successDeleteProduct(products.data.product))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', products.error)
    }
}


function* LoadWatchers() {
    yield takeEvery(REQUEST_GET_CATEGORY, GetCategoryHandler)
    yield takeEvery(REQUEST_GET_UNIT, GetUnitHandler)
    yield takeEvery(REQUEST_GET_PRODUCT, GetProductHandler)
    yield takeEvery(REQUEST_GET_STATUS, GetStatusHandler)
}


export function* ActionWatchers() {
    yield takeEvery(REQUEST_SAVE_CATEGORY, SaveCategoryHandler)
    yield takeEvery(REQUEST_UPDATE_CATEGORY, UpdateCategoryHandler)
    yield takeEvery(REQUEST_DELETE_CATEGORY, DeleteCategoryHandler)

    yield takeEvery(REQUEST_SAVE_UNIT, SaveUnitHandler)
    yield takeEvery(REQUEST_UPDATE_UNIT, UpdateUnitHandler)
    yield takeEvery(REQUEST_DELETE_UNIT, DeleteUnitHandler)

    yield takeEvery(REQUEST_SAVE_PRODUCT, SaveProductHandler)
    yield takeEvery(REQUEST_SAVE_BULKPRODUCT, SaveBulkProductHandler)
    yield takeEvery(REQUEST_UPDATE_PRODUCT, UpdateProductHandler)
    yield takeEvery(REQUEST_DELETE_PRODUCT, DeleteProductHandler)

}
 
export default function* rootSaga() {
    yield all([
        fork(LoadWatchers),
        fork(ActionWatchers),
    ]);
}

