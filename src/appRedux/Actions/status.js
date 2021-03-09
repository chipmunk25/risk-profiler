

import { createAction } from 'redux-actions';
import {
    REQUEST_GET_STATUS, REQUEST_SAVE_STATUS, REQUEST_UPDATE_STATUS,REQUEST_DELETE_STATUS,

     SUCCESS_GET_STATUS, SUCCESS_SAVE_STATUS, SUCCESS_UPDATE_STATUS,  SUCCESS_DELETE_STATUS,
   
} from './constants'
  

export const requestGetStatus = createAction(REQUEST_GET_STATUS);
export const successGetStatus = createAction(SUCCESS_GET_STATUS);
export const requestSaveStatus = createAction(REQUEST_SAVE_STATUS);
export const successSaveStatus = createAction(SUCCESS_SAVE_STATUS);
export const requestUpdateStatus = createAction(REQUEST_UPDATE_STATUS);
export const successUpdateStatus = createAction(SUCCESS_UPDATE_STATUS);
export const requestDeleteStatus = createAction(REQUEST_DELETE_STATUS);
export const successDeleteStatus = createAction(SUCCESS_DELETE_STATUS);
