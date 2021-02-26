import {
    SUCCESS_GET_AVAILABLESTOCK, SUCCESS_GET_WAREHOUSESTOCK, SUCCESS_GET_PENDINGMOVEMENT,
    SUCCESS_GET_PENDINGMOVEMENT_SUMMARY, SUCCESS_SAVE_MOVEMENTAUTHORIZED,
    SUCCESS_GET_PENDINGSTOCKTRANSFER_SUMMARY, SUCCESS_GET_PENDINGSTOCKTRANSFER,
    SUCCESS_GET_STOCK,
} from "../Actions/constants";

const INIT_STATE = {
    warehouseLists: [],
    stockLists: [],
    availableLists: [],
    pendingMovementLists: [],
    pendingStockTransferLists: [],
    pendingMovementSummaryLists: [],
    pendingStockTransferSummaryLists: [],
    totalPages: 0,
    totalItems: 0,
};

const stocks = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SUCCESS_GET_AVAILABLESTOCK:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_STOCK:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_WAREHOUSESTOCK:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_PENDINGMOVEMENT:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_PENDINGSTOCKTRANSFER:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_PENDINGMOVEMENT_SUMMARY:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_PENDINGSTOCKTRANSFER_SUMMARY:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_SAVE_MOVEMENTAUTHORIZED:
            /*   bbk = [...state.pendingMovementSummaryLists];
              action.payload && action.payload.forEach(row => {
                  const index = state.pendingMovementSummaryLists.indexOf(state.pendingMovementSummaryLists.find(item => row.booking_code === item.booking_code));
                  if (index > -1) { bbk[index].parcel_ms.push(row) }
              }) */
            const result = action.payload && action.payload.forEach(row => {
                // console.log(row)
                return state.pendingMovementSummaryLists.filter(item => item.transfer_code !== row.transfer_code)
            })
            //  const returnList = state.pendingMovementSummaryLists.filter(item => !action.payload.includes(item.transfer_code))
            //   // console.log(returnList, state.pendingMovementSummaryLists, action.payload)
            // console.log(result)


            return {
                ...state,
                pendingMovementSummaryLists: result
            };

        default:
            return state
    }
}


export default stocks;