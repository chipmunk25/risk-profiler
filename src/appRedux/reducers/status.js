import {
    SUCCESS_GET_STATUS, SUCCESS_UPDATE_STATUS, SUCCESS_SAVE_STATUS, SUCCESS_DELETE_STATUS,
} from "../Actions/constants"

const INIT_STATE = {
    statusLists: [],
    totalPages: 0,
    totalItems: 0,
};
let newlist, index
const products = (state = INIT_STATE, action) => {
    switch (action.type) {
       
        case SUCCESS_GET_STATUS:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_SAVE_STATUS:
            return {
                ...state, statusLists: [...state.statusLists, { ...action.payload }]
            }
        case SUCCESS_UPDATE_STATUS:
            index = state.statusLists.indexOf(state.statusLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.statusLists];
            if (index > -1) {
                newlist[index] = action.payload;
            }
            return { ...state, statusLists: newlist }

        case SUCCESS_DELETE_STATUS:
            return {
                ...state,
                statusLists: state.statusLists.filter((item) => item.id !== action.payload.id),
            };
        default:
            return state
    }
}
export default products;