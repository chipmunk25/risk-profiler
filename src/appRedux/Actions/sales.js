
import {
    REQUEST_GET_PROFOMA, REQUEST_SAVE_PROFOMA, REQUEST_UPDATE_PROFOMA, REQUEST_DELETE_PROFOMA,
    REQUEST_SAVE_SALES, REQUEST_GET_SALES, REQUEST_GET_BILLDUE, REQUEST_GET_TOPCUSTOMER, REQUEST_SAVE_CASHTRANS,
    REQUEST_GET_MONTHSALES, REQUEST_GET_SALESLISTS,
    SUCCESS_GET_PROFOMA, SUCCESS_SAVE_PROFOMA, SUCCESS_UPDATE_PROFOMA, SUCCESS_DELETE_PROFOMA,
    SUCCESS_SAVE_SALES, SUCCESS_GET_SALES, SUCCESS_GET_BILLDUE, SUCCESS_GET_TOPCUSTOMER, SUCCESS_SAVE_CASHTRANS,
    SUCCESS_GET_MONTHSALES, SUCCESS_GET_SALESLISTS,REQUEST_GET_CASHTRANS,SUCCESS_GET_CASHTRANS,
    
} from './constants';

import { createAction } from 'redux-actions';
 
export const requestGetProfoma = createAction(REQUEST_GET_PROFOMA);
export const successGetProfoma = createAction(SUCCESS_GET_PROFOMA);
export const requestSaveProfoma = createAction(REQUEST_SAVE_PROFOMA);
export const successSaveProfoma = createAction(SUCCESS_SAVE_PROFOMA);
export const requestUpdateProfoma = createAction(REQUEST_UPDATE_PROFOMA);
export const successUpdateProfoma = createAction(SUCCESS_UPDATE_PROFOMA);
export const requestDeleteProfoma = createAction(REQUEST_DELETE_PROFOMA);
export const successDeleteProfoma = createAction(SUCCESS_DELETE_PROFOMA);


export const requestSaveCashTrans = createAction(REQUEST_SAVE_CASHTRANS);
export const successSaveCashTrans = createAction(SUCCESS_SAVE_CASHTRANS);

export const requestSaveSales = createAction(REQUEST_SAVE_SALES);
export const successSaveSales = createAction(SUCCESS_SAVE_SALES);

export const requestGetSales = createAction(REQUEST_GET_SALES);
export const successGetSales = createAction(SUCCESS_GET_SALES);

export const requestGetSalesLists = createAction(REQUEST_GET_SALESLISTS);
export const successGetSalesLists = createAction(SUCCESS_GET_SALESLISTS);

export const requestGetCashTrans = createAction(REQUEST_GET_CASHTRANS);
export const successGetCashTrans = createAction(SUCCESS_GET_CASHTRANS);

export const requestGetMonthSales = createAction(REQUEST_GET_MONTHSALES);
export const successGetMonthSales = createAction(SUCCESS_GET_MONTHSALES);

export const requestGetBillDue = createAction(REQUEST_GET_BILLDUE);
export const successGetBillDue = createAction(SUCCESS_GET_BILLDUE);

export const requestGetTopCustomer = createAction(REQUEST_GET_TOPCUSTOMER);
export const successGetTopCustomer = createAction(SUCCESS_GET_TOPCUSTOMER);