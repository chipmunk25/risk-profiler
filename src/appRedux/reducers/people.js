import {
    SUCCESS_GET_CUSTOMER, SUCCESS_UPDATE_CUSTOMER, SUCCESS_SAVE_CUSTOMER, SUCCESS_DELETE_CUSTOMER,
    SUCCESS_GET_SUPPLIER, SUCCESS_UPDATE_SUPPLIER, SUCCESS_SAVE_SUPPLIER, SUCCESS_DELETE_SUPPLIER,
} from "../Actions/constants"

const INIT_STATE = {
    customerLists: [],
    customerTypeLists: [
        { id: 1, customer_type: "Walk In", shortname: "WI", },
        { id: 2, customer_type: "Retailer", shortname: "R", },
        { id: 3, customer_type: "Wholesaler", shortname: "W", },
        { id: 4, customer_type: "Distributor", shortname: "D", },
        { id: 5, customer_type: "Long Term", shortname: "LT", },
        { id: 6, customer_type: "Short Term", shortname: "ST", },
    ],
    supplierLists: [],
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
            index = state.customerLists.indexOf(state.customerLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.customerLists];
            if (index > -1) {
                newlist[index].customer_type_id = action.payload.customer_type_id;
                newlist[index].customer = action.payload.customer;
                newlist[index].telephone = action.payload.telephone;
                newlist[index].address = action.payload.address;
                newlist[index].email = action.payload.email;
            }
            return { ...state, customerLists: newlist }
        case SUCCESS_DELETE_CUSTOMER:
            return {
                ...state,
                customerLists: state.customerLists.filter((item) => parseInt(item.id) !== parseInt(action.payload.id)),
            };
        case SUCCESS_GET_SUPPLIER:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_SAVE_SUPPLIER:
            return {
                ...state, supplierLists: [...state.supplierLists, { ...action.payload }]
            }
        case SUCCESS_UPDATE_SUPPLIER:
            index = state.supplierLists.indexOf(state.supplierLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.supplierLists];
            if (index > -1) {
                newlist[index].supplier = action.payload.supplier;
                newlist[index].contact_person = action.payload.contact_person;
                newlist[index].telephone = action.payload.telephone;
                newlist[index].address = action.payload.address;
                newlist[index].email = action.payload.email;
            }
            return { ...state, supplierLists: newlist }
        case SUCCESS_DELETE_SUPPLIER:
            return {
                ...state,
                supplierLists: state.supplierLists.filter((item) => parseInt(item.id) !== parseInt(action.payload.id)),
            };

        default:
            return state
    }
}
export default people;