import { SUCCESS_GET_LEDGERHEAD, SUCCESS_GET_LEDGER, SUCCESS_SAVE_LEDGER, SUCCESS_UPDATE_LEDGER } from "../Actions/constants"
const INIT_STATE = {
    acheadLists: [],
    ledgerLists: [],
    totalPages: 0,
    totalItems: 0,
};
let newlist, index
const ledgers = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SUCCESS_GET_LEDGER:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_LEDGERHEAD:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_SAVE_LEDGER:
            return {
                ...state, ledgerLists: [...state.ledgerLists, { ...action.payload }]
            }
            case SUCCESS_UPDATE_LEDGER:
                index = state.ledgerLists.indexOf(state.ledgerLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
                newlist = [...state.ledgerLists];
                if (index > -1) {
                    newlist[index].ac_head = action.payload.ac_head;
                }
                return { ...state, ledgerLists: newlist }
    
        default:
            return state
    }
}


export default ledgers;