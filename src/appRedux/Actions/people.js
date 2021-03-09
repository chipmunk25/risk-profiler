
import { createAction } from 'redux-actions';
import {
    REQUEST_GET_CUSTOMER, REQUEST_SAVE_CUSTOMER, REQUEST_UPDATE_CUSTOMER, REQUEST_DELETE_CUSTOMER,

    SUCCESS_GET_CUSTOMER, SUCCESS_SAVE_CUSTOMER, SUCCESS_UPDATE_CUSTOMER, SUCCESS_DELETE_CUSTOMER,

} from './constants';


export const requestGetCustomer = createAction(REQUEST_GET_CUSTOMER);
export const successGetCustomer = createAction(SUCCESS_GET_CUSTOMER);
export const requestSaveCustomer = createAction(REQUEST_SAVE_CUSTOMER);
export const successSaveCustomer = createAction(SUCCESS_SAVE_CUSTOMER);
export const requestUpdateCustomer = createAction(REQUEST_UPDATE_CUSTOMER);
export const successUpdateCustomer = createAction(SUCCESS_UPDATE_CUSTOMER);
export const requestDeleteCustomer = createAction(REQUEST_DELETE_CUSTOMER);
export const successDeleteCustomer = createAction(SUCCESS_DELETE_CUSTOMER);
