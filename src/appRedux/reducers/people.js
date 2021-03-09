import {
    SUCCESS_GET_CUSTOMER, SUCCESS_UPDATE_CUSTOMER, SUCCESS_SAVE_CUSTOMER, SUCCESS_DELETE_CUSTOMER,
} from "../Actions/constants"

const INIT_STATE = {
    customerLists: [],
    totalPages: 0,
    totalItems: 0,
};
let newlist, index
const people = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SUCCESS_GET_CUSTOMER:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_SAVE_CUSTOMER:
            return {
                ...state, customerLists: [...state.customerLists, { ...action.payload }]
            }
        case SUCCESS_UPDATE_CUSTOMER:
            index = state.customerLists.indexOf(state.customerLists.find(item => action.payload.customer_no === item.customer_no));
            newlist = [...state.customerLists];
            if (index > -1) {
                newlist[index].customer = action.payload.customer;
                newlist[index].account_no = action.payload.account_no;
                newlist[index].branch_id = action.payload.branch_id;
                newlist[index].telephone = action.payload.telephone;
                newlist[index].address = action.payload.address;
                newlist[index].email = action.payload.email;
            }
            return { ...state, customerLists: newlist }
        case SUCCESS_DELETE_CUSTOMER:
            return {
                ...state,
                customerLists: state.customerLists.filter((item) => item.customer_no !== action.payload.customer_no),
            };
        
        default:
            return state
    }
}
export default people;