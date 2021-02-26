

import { createAction } from 'redux-actions';
import {
    REQUEST_GET_LEDGERHEAD, REQUEST_GET_LEDGER, REQUEST_SAVE_LEDGER, REQUEST_UPDATE_LEDGER, REQUEST_DELETE_LEDGER,

    SUCCESS_GET_LEDGERHEAD, SUCCESS_GET_LEDGER, SUCCESS_SAVE_LEDGER, SUCCESS_UPDATE_LEDGER, SUCCESS_DELETE_LEDGER,

} from "./constants"

export const requestGetLedgerHead = createAction(REQUEST_GET_LEDGERHEAD);
export const successGetLedgerHead = createAction(SUCCESS_GET_LEDGERHEAD);

export const requestGetLedger = createAction(REQUEST_GET_LEDGER);
export const successGetLedger = createAction(SUCCESS_GET_LEDGER);
export const requestSaveLedger = createAction(REQUEST_SAVE_LEDGER);
export const successSaveLedger = createAction(SUCCESS_SAVE_LEDGER);
export const requestUpdateLedger = createAction(REQUEST_UPDATE_LEDGER);
export const successUpdateLedger = createAction(SUCCESS_UPDATE_LEDGER);
export const requestDeleteLedger = createAction(REQUEST_DELETE_LEDGER);
export const successDeleteLedger = createAction(SUCCESS_DELETE_LEDGER);

