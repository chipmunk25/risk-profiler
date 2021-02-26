
import {
    REQUEST_GET_STOCK, REQUEST_SAVE_STOCK, REQUEST_UPDATE_STOCK, REQUEST_DELETE_STOCK,
    REQUEST_GET_WAREHOUSE, REQUEST_SAVE_WAREHOUSE, REQUEST_UPDATE_WAREHOUSE, REQUEST_DELETE_WAREHOUSE,
    REQUEST_GET_WAREHOUSESTOCK, REQUEST_GET_AVAILABLESTOCK, REQUEST_SAVE_MOVEMENT, REQUEST_SAVE_MOVEMENTAUTHORIZED, REQUEST_GET_PENDINGMOVEMENT,
    REQUEST_GET_PENDINGMOVEMENT_SUMMARY, REQUEST_SAVE_STOCKTRANSFER, REQUEST_SAVE_STOCKTRANSFERAUTHORIZED,
    REQUEST_GET_PENDINGSTOCKTRANSFER_SUMMARY, REQUEST_GET_PENDINGSTOCKTRANSFER,
    SUCCESS_GET_STOCK, SUCCESS_SAVE_STOCK, SUCCESS_UPDATE_STOCK, SUCCESS_DELETE_STOCK,
    SUCCESS_GET_WAREHOUSE, SUCCESS_SAVE_WAREHOUSE, SUCCESS_UPDATE_WAREHOUSE, SUCCESS_DELETE_WAREHOUSE,
    SUCCESS_GET_WAREHOUSESTOCK, SUCCESS_GET_AVAILABLESTOCK, SUCCESS_SAVE_MOVEMENT, SUCCESS_SAVE_MOVEMENTAUTHORIZED, SUCCESS_GET_PENDINGMOVEMENT,
    SUCCESS_GET_PENDINGMOVEMENT_SUMMARY, SUCCESS_SAVE_STOCKTRANSFER, SUCCESS_SAVE_STOCKTRANSFERAUTHORIZED,
    SUCCESS_GET_PENDINGSTOCKTRANSFER_SUMMARY, SUCCESS_GET_PENDINGSTOCKTRANSFER,
} from './constants';

import { createAction } from 'redux-actions';

export const requestGetStock = createAction(REQUEST_GET_STOCK);
export const successGetStock = createAction(SUCCESS_GET_STOCK);
export const requestSaveStock = createAction(REQUEST_SAVE_STOCK);
export const successSaveStock = createAction(SUCCESS_SAVE_STOCK);
export const requestUpdateStock = createAction(REQUEST_UPDATE_STOCK);
export const successUpdateStock = createAction(SUCCESS_UPDATE_STOCK);
export const requestDeleteStock = createAction(REQUEST_DELETE_STOCK);
export const successDeleteStock = createAction(SUCCESS_DELETE_STOCK);

export const requestGetWarehouse = createAction(REQUEST_GET_WAREHOUSE);
export const successGetWarehouse = createAction(SUCCESS_GET_WAREHOUSE);
export const requestSaveWarehouse = createAction(REQUEST_SAVE_WAREHOUSE);
export const successSaveWarehouse = createAction(SUCCESS_SAVE_WAREHOUSE);
export const requestUpdateWarehouse = createAction(REQUEST_UPDATE_WAREHOUSE);
export const successUpdateWarehouse = createAction(SUCCESS_UPDATE_WAREHOUSE);
export const requestDeleteWarehouse = createAction(REQUEST_DELETE_WAREHOUSE);
export const successDeleteWarehouse = createAction(SUCCESS_DELETE_WAREHOUSE);




export const requestSaveMovement = createAction(REQUEST_SAVE_MOVEMENT);
export const successSaveMovement = createAction(SUCCESS_SAVE_MOVEMENT);
export const requestSaveMovementAuthorized = createAction(REQUEST_SAVE_MOVEMENTAUTHORIZED);
export const successSaveMovementAuthorized = createAction(SUCCESS_SAVE_MOVEMENTAUTHORIZED);

export const requestSaveStockTransfer = createAction(REQUEST_SAVE_STOCKTRANSFER);
export const successSaveStockTransfer = createAction(SUCCESS_SAVE_STOCKTRANSFER);
export const requestSaveStockTransferAuthorized = createAction(REQUEST_SAVE_STOCKTRANSFERAUTHORIZED);
export const successSaveStockTransferAuthorized = createAction(SUCCESS_SAVE_STOCKTRANSFERAUTHORIZED);

export const requestGetPendingMovementSummary = createAction(REQUEST_GET_PENDINGMOVEMENT_SUMMARY);
export const successGetPendingMovementSummary = createAction(SUCCESS_GET_PENDINGMOVEMENT_SUMMARY);
export const requestGetPendingStockTransferSummary = createAction(REQUEST_GET_PENDINGSTOCKTRANSFER_SUMMARY);
export const successGetPendingStockTransferSummary = createAction(SUCCESS_GET_PENDINGSTOCKTRANSFER_SUMMARY);

export const requestGetPendingMovement = createAction(REQUEST_GET_PENDINGMOVEMENT);
export const successGetPendingMovement = createAction(SUCCESS_GET_PENDINGMOVEMENT);

export const requestGetPendingStockTransfer = createAction(REQUEST_GET_PENDINGSTOCKTRANSFER);
export const successGetPendingStockTransfer = createAction(SUCCESS_GET_PENDINGSTOCKTRANSFER);

export const requestGetWarehouseStock = createAction(REQUEST_GET_WAREHOUSESTOCK);
export const successGetWarehouseStock = createAction(SUCCESS_GET_WAREHOUSESTOCK);
export const requestGetAvailableStock = createAction(REQUEST_GET_AVAILABLESTOCK);
export const successGetAvailableStock = createAction(SUCCESS_GET_AVAILABLESTOCK);