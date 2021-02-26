

import { createAction } from 'redux-actions';
import {
    REQUEST_GET_CATEGORY, REQUEST_SAVE_CATEGORY, REQUEST_UPDATE_CATEGORY, REQUEST_DELETE_CATEGORY,
    REQUEST_GET_UNIT, REQUEST_SAVE_UNIT, REQUEST_UPDATE_UNIT,REQUEST_DELETE_UNIT,
    REQUEST_GET_PRODUCT, REQUEST_SAVE_PRODUCT, REQUEST_UPDATE_PRODUCT, REQUEST_DELETE_PRODUCT,
    REQUEST_GET_STATUS,REQUEST_SAVE_BULKPRODUCT,

    SUCCESS_GET_CATEGORY, SUCCESS_SAVE_CATEGORY, SUCCESS_UPDATE_CATEGORY, SUCCESS_DELETE_CATEGORY,
    SUCCESS_GET_UNIT, SUCCESS_SAVE_UNIT, SUCCESS_UPDATE_UNIT,  SUCCESS_DELETE_UNIT,
    SUCCESS_GET_PRODUCT, SUCCESS_SAVE_PRODUCT, SUCCESS_UPDATE_PRODUCT,  SUCCESS_DELETE_PRODUCT,
    SUCCESS_GET_STATUS,SUCCESS_SAVE_BULKPRODUCT,
} from './constants'
  
export const requestGetCategory = createAction(REQUEST_GET_CATEGORY);
export const successGetCategory = createAction(SUCCESS_GET_CATEGORY);
export const requestSaveCategory = createAction(REQUEST_SAVE_CATEGORY);
export const successSaveCategory = createAction(SUCCESS_SAVE_CATEGORY);
export const requestUpdateCategory = createAction(REQUEST_UPDATE_CATEGORY);
export const successUpdateCategory = createAction(SUCCESS_UPDATE_CATEGORY);
export const requestDeleteCategory = createAction(REQUEST_DELETE_CATEGORY);
export const successDeleteCategory = createAction(SUCCESS_DELETE_CATEGORY);

export const requestGetUnit = createAction(REQUEST_GET_UNIT);
export const successGetUnit = createAction(SUCCESS_GET_UNIT);
export const requestSaveUnit = createAction(REQUEST_SAVE_UNIT);
export const successSaveUnit = createAction(SUCCESS_SAVE_UNIT);
export const requestUpdateUnit = createAction(REQUEST_UPDATE_UNIT);
export const successUpdateUnit = createAction(SUCCESS_UPDATE_UNIT);
export const requestDeleteUnit = createAction(REQUEST_DELETE_UNIT);
export const successDeleteUnit = createAction(SUCCESS_DELETE_UNIT);

export const requestGetStatus = createAction(REQUEST_GET_STATUS);
export const successGetStatus = createAction(SUCCESS_GET_STATUS);

export const requestGetProduct = createAction(REQUEST_GET_PRODUCT);
export const successGetProduct = createAction(SUCCESS_GET_PRODUCT);
export const requestSaveProduct = createAction(REQUEST_SAVE_PRODUCT);
export const successSaveProduct = createAction(SUCCESS_SAVE_PRODUCT);
export const requestSaveBulkProduct = createAction(REQUEST_SAVE_BULKPRODUCT);
export const successSaveBulkProduct = createAction(SUCCESS_SAVE_BULKPRODUCT);

export const requestUpdateProduct = createAction(REQUEST_UPDATE_PRODUCT);
export const successUpdateProduct = createAction(SUCCESS_UPDATE_PRODUCT);
export const requestDeleteProduct = createAction(REQUEST_DELETE_PRODUCT);
export const successDeleteProduct = createAction(SUCCESS_DELETE_PRODUCT);
  