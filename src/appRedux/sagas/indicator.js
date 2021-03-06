import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    getIndicatorTypeFromApi, CreateIndicatorType, ChangeIndicatorType, RemoveIndicatorType,
    getIndicatorFromApi, CreateIndicator, ChangeIndicator, RemoveIndicator,
    getIndicatorMappingFromApi, CreateIndicatorMapping, ChangeIndicatorMapping, RemoveIndicatorMapping,
    getDescriptionFromApi, CreateDescription, ChangeDescription, RemoveDescription,
    getCustomerProfilerFromApi, CreateCustomerProfiler, ChangeCustomerProfiler, RemoveCustomerProfiler,
    getCustomerProfilerSummaryFromApi, RemoveReview, ChangeReview, CreateReview, getReviewFromApi,
    RemoveCustomerReview, ChangeCustomerReview, CreateCustomerReview, getCustomerReviewFromApi, getOneCustomerProfilerFromApi,
} from "../api/indicator"

import {
    successGetIndicatorType, successSaveIndicatorType, successUpdateIndicatorType, successDeleteIndicatorType,
    successGetIndicator, successSaveIndicator, successUpdateIndicator, successDeleteIndicator,
    successGetIndicatorMapping, successSaveIndicatorMapping, successUpdateIndicatorMapping, successDeleteIndicatorMapping,
    successGetDescription, successSaveDescription, successUpdateDescription, successDeleteDescription,
    successDeleteProfiler, successUpdateProfiler, successSaveProfiler, successGetProfiler, successGetProfilerSummary,
    successDeleteReview, successUpdateReview, successSaveReview, successGetReview,
    successDeleteCustomerReview, successUpdateCustomerReview, successSaveCustomerReview, successGetCustomerReview, successGetCustomerProfiler,
} from "../Actions/indicator"
import {
    REQUEST_GET_INDICATORTYPE, REQUEST_SAVE_INDICATORTYPE, REQUEST_UPDATE_INDICATORTYPE, REQUEST_DELETE_INDICATORTYPE,
    REQUEST_GET_INDICATOR, REQUEST_SAVE_INDICATOR, REQUEST_UPDATE_INDICATOR, REQUEST_DELETE_INDICATOR,
    REQUEST_GET_INDICATORMAPPING, REQUEST_SAVE_INDICATORMAPPING, REQUEST_UPDATE_INDICATORMAPPING, REQUEST_DELETE_INDICATORMAPPING,
    REQUEST_GET_DESCRIPTION, REQUEST_SAVE_DESCRIPTION, REQUEST_UPDATE_DESCRIPTION, REQUEST_DELETE_DESCRIPTION,
    REQUEST_DELETE_PROFILER, REQUEST_UPDATE_PROFILER, REQUEST_SAVE_PROFILER, REQUEST_GET_PROFILER,
    REQUEST_GET_PROFILERSUMMARY, REQUEST_DELETE_REVIEW, REQUEST_UPDATE_REVIEW, REQUEST_SAVE_REVIEW, REQUEST_GET_REVIEW,
    REQUEST_DELETE_CUSTOMERREVIEW, REQUEST_UPDATE_CUSTOMERREVIEW, REQUEST_SAVE_CUSTOMERREVIEW, REQUEST_GET_CUSTOMERREVIEW, REQUEST_GET_CUSTOMER_PROFILER
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

function* GetCustomerReviewHandler({ payload }) {
    let indicator;

    indicator = yield call(getCustomerReviewFromApi, sessionStorage.getItem('token'), payload)

    yield put(hideAuthLoader())
    if (indicator.status === 200) {
        yield put(successGetCustomerReview({ customerReviewLists: indicator.data.indicators }))
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* SaveCustomerReviewHandler({ payload }) {
    const indicators = yield call(CreateCustomerReview, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successSaveCustomerReview(indicators.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* UpdateCustomerReviewHandler({ payload }) {
    const indicators = yield call(ChangeCustomerReview, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successUpdateCustomerReview(indicators.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* DeleteCustomerReviewHandler({ payload }) {
    const indicator = yield call(RemoveCustomerReview, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicator.status === 201) {
        yield put(successDeleteCustomerReview(indicator.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}


function* GetReviewHandler({ payload }) {
    let indicator;

    indicator = yield call(getReviewFromApi, sessionStorage.getItem('token'), payload)

    yield put(hideAuthLoader())
    if (indicator.status === 200) {
        yield put(successGetReview({ reviewLists: indicator.data.indicators }))
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* SaveReviewHandler({ payload }) {
    const indicators = yield call(CreateReview, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successSaveReview(indicators.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* UpdateReviewHandler({ payload }) {
    const indicators = yield call(ChangeReview, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successUpdateReview(indicators.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* DeleteReviewHandler({ payload }) {
    const indicator = yield call(RemoveReview, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicator.status === 201) {
        yield put(successDeleteReview(indicator.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* GetDescriptionHandler({ payload }) {
    let indicator;

    indicator = yield call(getDescriptionFromApi, sessionStorage.getItem('token'), payload)

    yield put(hideAuthLoader())
    if (indicator.status === 200) {
        yield put(successGetDescription({ descriptionLists: indicator.data.indicators }))
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* SaveDescriptionHandler({ payload }) {
    const indicators = yield call(CreateDescription, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successSaveDescription(indicators.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* UpdateDescriptionHandler({ payload }) {
    const indicators = yield call(ChangeDescription, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successUpdateDescription(indicators.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* DeleteDescriptionHandler({ payload }) {
    const indicator = yield call(RemoveDescription, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicator.status === 201) {
        yield put(successDeleteDescription(indicator.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* GetIndicatorMappingHandler({ payload }) {
    let indicator;

    indicator = yield call(getIndicatorMappingFromApi, sessionStorage.getItem('token'), payload)

    yield put(hideAuthLoader())
    if (indicator.status === 200) {
        yield put(successGetIndicatorMapping({ indicatorMappingLists: indicator.data.indicators }))
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* SaveIndicatorMappingHandler({ payload }) {
    const indicators = yield call(CreateIndicatorMapping, sessionStorage.getItem('token'), payload)
    //  console.log(indicators)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successSaveIndicatorMapping(indicators.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* UpdateIndicatorMappingHandler({ payload }) {
    const indicators = yield call(ChangeIndicatorMapping, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successUpdateIndicatorMapping(indicators.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* DeleteIndicatorMappingHandler({ payload }) {
    const indicator = yield call(RemoveIndicatorMapping, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicator.status === 201) {
        yield put(successDeleteIndicatorMapping(indicator.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* GetIndicatorHandler({ payload }) {
    let indicator;

    indicator = yield call(getIndicatorFromApi, sessionStorage.getItem('token'), payload)

    yield put(hideAuthLoader())
    if (indicator.status === 200) {
        yield put(successGetIndicator({ indicatorLists: indicator.data.indicators }))
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* SaveIndicatorHandler({ payload }) {
    const indicators = yield call(CreateIndicator, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successSaveIndicator(indicators.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* UpdateIndicatorHandler({ payload }) {
    const indicators = yield call(ChangeIndicator, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successUpdateIndicator(indicators.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* DeleteIndicatorHandler({ payload }) {
    const indicator = yield call(RemoveIndicator, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicator.status === 201) {
        yield put(successDeleteIndicator(indicator.data.indicators))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* GetCustomerProfilerHandler({ payload }) {
    let indicator;

    indicator = yield call(getCustomerProfilerFromApi, sessionStorage.getItem('token'), payload)

    yield put(hideAuthLoader())
    if (indicator.status === 200) {
        yield put(successGetProfiler({ profilerLists: indicator.data.profilers }))
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* GetOneCustomerProfilerHandler({ payload }) {
    let indicator;

    indicator = yield call(getOneCustomerProfilerFromApi, sessionStorage.getItem('token'), payload)
    console.log(indicator)
    yield put(hideAuthLoader())
    if (indicator.status === 200) {
        yield put(successGetCustomerProfiler({ customerProfiler: indicator.data.indicators }))
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* GetCustomerProfilerSummaryHandler({ payload }) {
    let indicator;

    indicator = yield call(getCustomerProfilerSummaryFromApi, sessionStorage.getItem('token'), payload)

    yield put(hideAuthLoader())
    if (indicator.status === 200) {
        yield put(successGetProfilerSummary({ profilerSummaryLists: indicator.data.indicators }))
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* SaveCustomerProfilerHandler({ payload }) {
    const indicators = yield call(CreateCustomerProfiler, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    // yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successSaveProfiler(indicators.data.profilers))
        const cust = {
            del_flg: 0, company_id: payload.customer.company_id, customer_no: payload.customer_no
        }
        console.log(cust)
        const prof = yield call(getOneCustomerProfilerFromApi, sessionStorage.getItem('token'), cust)
        if (prof.status === 200) {
            yield put(successGetCustomerProfiler({ customerProfiler: prof.data.indicators }))
        }
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* UpdateCustomerProfilerHandler({ payload }) {
    const indicators = yield call(ChangeCustomerProfiler, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicators.status === 201) {
        yield put(successUpdateProfiler(indicators.data.profilers))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicators.error)
    }
}

function* DeleteCustomerProfilerHandler({ payload }) {
    const indicator = yield call(RemoveCustomerProfiler, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (indicator.status === 201) {
        yield put(successDeleteProfiler(indicator.data.profilers))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', indicator.error)
    }
}

function* LoadWatchers() {
    yield takeEvery(REQUEST_GET_INDICATORTYPE, GetIndicatorTypeHandler)
    yield takeEvery(REQUEST_GET_CUSTOMERREVIEW, GetCustomerReviewHandler)
    yield takeEvery(REQUEST_GET_REVIEW, GetReviewHandler)
    yield takeEvery(REQUEST_GET_DESCRIPTION, GetDescriptionHandler)
    yield takeEvery(REQUEST_GET_INDICATORMAPPING, GetIndicatorMappingHandler)
    yield takeEvery(REQUEST_GET_INDICATOR, GetIndicatorHandler)
    yield takeEvery(REQUEST_GET_PROFILER, GetCustomerProfilerHandler)
    yield takeEvery(REQUEST_GET_CUSTOMER_PROFILER, GetOneCustomerProfilerHandler)
    yield takeEvery(REQUEST_GET_PROFILERSUMMARY, GetCustomerProfilerSummaryHandler)
}


export function* ActionWatchers() {
    yield takeEvery(REQUEST_SAVE_INDICATORTYPE, SaveIndicatorTypeHandler)
    yield takeEvery(REQUEST_UPDATE_INDICATORTYPE, UpdateIndicatorTypeHandler)
    yield takeEvery(REQUEST_DELETE_INDICATORTYPE, DeleteIndicatorTypeHandler)

    yield takeEvery(REQUEST_SAVE_CUSTOMERREVIEW, SaveCustomerReviewHandler)
    yield takeEvery(REQUEST_UPDATE_CUSTOMERREVIEW, UpdateCustomerReviewHandler)
    yield takeEvery(REQUEST_DELETE_CUSTOMERREVIEW, DeleteCustomerReviewHandler)

    yield takeEvery(REQUEST_SAVE_REVIEW, SaveReviewHandler)
    yield takeEvery(REQUEST_UPDATE_REVIEW, UpdateReviewHandler)
    yield takeEvery(REQUEST_DELETE_REVIEW, DeleteReviewHandler)

    yield takeEvery(REQUEST_SAVE_PROFILER, SaveCustomerProfilerHandler)
    yield takeEvery(REQUEST_UPDATE_PROFILER, UpdateCustomerProfilerHandler)
    yield takeEvery(REQUEST_DELETE_PROFILER, DeleteCustomerProfilerHandler)

    yield takeEvery(REQUEST_SAVE_DESCRIPTION, SaveDescriptionHandler)
    yield takeEvery(REQUEST_UPDATE_DESCRIPTION, UpdateDescriptionHandler)
    yield takeEvery(REQUEST_DELETE_DESCRIPTION, DeleteDescriptionHandler)
    yield takeEvery(REQUEST_SAVE_INDICATORMAPPING, SaveIndicatorMappingHandler)
    yield takeEvery(REQUEST_UPDATE_INDICATORMAPPING, UpdateIndicatorMappingHandler)
    yield takeEvery(REQUEST_DELETE_INDICATORMAPPING, DeleteIndicatorMappingHandler)
    yield takeEvery(REQUEST_SAVE_INDICATOR, SaveIndicatorHandler)
    yield takeEvery(REQUEST_UPDATE_INDICATOR, UpdateIndicatorHandler)
    yield takeEvery(REQUEST_DELETE_INDICATOR, DeleteIndicatorHandler)

}

export default function* rootSaga() {
    yield all([
        fork(LoadWatchers),
        fork(ActionWatchers),
    ]);
}

