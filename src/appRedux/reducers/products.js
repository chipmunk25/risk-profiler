import {
    SUCCESS_GET_CATEGORY, SUCCESS_UPDATE_CATEGORY, SUCCESS_SAVE_CATEGORY, SUCCESS_DELETE_CATEGORY,
    SUCCESS_GET_UNIT, SUCCESS_UPDATE_UNIT, SUCCESS_SAVE_UNIT, SUCCESS_DELETE_UNIT,
    SUCCESS_GET_PRODUCT, SUCCESS_UPDATE_PRODUCT, SUCCESS_SAVE_PRODUCT, SUCCESS_DELETE_PRODUCT,
    SUCCESS_GET_STATUS,
} from "../Actions/constants"

const INIT_STATE = {
    categoryLists: [],
    unitLists: [],
    productLists: [],
    statusLists: [],
    totalPages: 0,
    totalItems: 0,
};
let newlist, index
const products = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SUCCESS_GET_CATEGORY:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_STATUS:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_SAVE_CATEGORY:
            return {
                ...state, categoryLists: [...state.categoryLists, { ...action.payload }]
            }
        case SUCCESS_UPDATE_CATEGORY:
            index = state.categoryLists.indexOf(state.categoryLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.categoryLists];
            if (index > -1) {
                newlist[index].product_category = action.payload.product_category;
            }
            return { ...state, categoryLists: newlist }

        case SUCCESS_DELETE_CATEGORY:
            return {
                ...state,
                categoryLists: state.categoryLists.filter((item) => item.id !== action.payload.id),
            };

        case SUCCESS_GET_UNIT:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_SAVE_UNIT:
            return {
                ...state, unitLists: [...state.unitLists, { ...action.payload }]
            }
        case SUCCESS_UPDATE_UNIT:
            index = state.unitLists.indexOf(state.unitLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.unitLists];
            if (index > -1) {
                newlist[index].name = action.payload.name;
            }
            return { ...state, unitLists: newlist }

        case SUCCESS_DELETE_UNIT:
            return {
                ...state,
                unitLists: state.unitLists.filter((item) => item.id !== action.payload.id),
            };
        case SUCCESS_GET_PRODUCT:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_SAVE_PRODUCT:
            return {
                ...state, productLists: [...state.productLists, { ...action.payload }]
            }
        case SUCCESS_UPDATE_PRODUCT:
            index = state.productLists.indexOf(state.productLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.productLists];
            if (index > -1) {
                newlist[index].category_id = action.payload.category_id;
                newlist[index].product_description = action.payload.product_description;
                newlist[index].unit_id = action.payload.unit_id;
                newlist[index].cost_price = action.payload.cost_price;
                newlist[index].selling_price = action.payload.selling_price;
                newlist[index].barcode = action.payload.barcode;
                newlist[index].low_stock_level = action.payload.low_stock_level;
            }
            return { ...state, productLists: newlist }
        case SUCCESS_DELETE_PRODUCT:
            return {
                ...state,
                productLists: state.productLists.filter((item) => item.id !== action.payload.id),
            };
        default:
            return state
    }
}
export default products;