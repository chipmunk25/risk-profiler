import {
    SUCCESS_GET_BILLDUE, SUCCESS_GET_MONTHSALES, SUCCESS_GET_SALESLISTS,
    SUCCESS_GET_PROFOMA, SUCCESS_GET_SALES, SUCCESS_GET_TOPCUSTOMER,SUCCESS_GET_CASHTRANS,
} from "../Actions/constants";

const INIT_STATE = {
    profomaLists: [],
    salesLists: [],
    salesRecords: [],
    cashLists: [],
    monthSalesLists: [],
    saleDetailsLists: [],
    billsDueLists: [],
    topCustomerLists: [],
    totalPages: 0,
    totalItems: 0,
};

const stocks = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SUCCESS_GET_PROFOMA:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_SALES:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_SALESLISTS:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_CASHTRANS:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_MONTHSALES:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_BILLDUE:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_TOPCUSTOMER:
            return {
                ...state, ...action.payload
            }
        default:
            return state
    }
}


export default stocks;