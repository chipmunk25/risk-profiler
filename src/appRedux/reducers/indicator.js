import {
    SUCCESS_GET_INDICATORTYPE, SUCCESS_SAVE_INDICATORTYPE, SUCCESS_UPDATE_INDICATORTYPE, SUCCESS_DELETE_INDICATORTYPE,
    SUCCESS_GET_INDICATOR, SUCCESS_SAVE_INDICATOR, SUCCESS_UPDATE_INDICATOR, SUCCESS_DELETE_INDICATOR,
    SUCCESS_GET_INDICATORMAPPING, SUCCESS_SAVE_INDICATORMAPPING, SUCCESS_UPDATE_INDICATORMAPPING, SUCCESS_DELETE_INDICATORMAPPING,
    SUCCESS_GET_DESCRIPTION, SUCCESS_SAVE_DESCRIPTION, SUCCESS_UPDATE_DESCRIPTION, SUCCESS_DELETE_DESCRIPTION,
} from "../Actions/constants"
const INIT_STATE = {
    indicatorTypeLists: [],
    indicatorLists: [],
    indicatorMappingLists: [],
    descriptionLists: [],
    totalPages: 0,
    totalItems: 0,
};
let newlist, index
const indicators = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SUCCESS_GET_INDICATORTYPE:
            return {
                ...state, ...action.payload
            }

        case SUCCESS_SAVE_INDICATORTYPE:
            return {
                ...state, indicatorTypeLists: [...state.indicatorTypeLists, { ...action.payload }]
            }
        case SUCCESS_UPDATE_INDICATORTYPE:
            index = state.indicatorTypeLists.indexOf(state.indicatorTypeLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.indicatorTypeLists];
            if (index > -1) {
                newlist[index].indicator_type = action.payload.indicator_type;
            }
            return { ...state, indicatorTypeLists: newlist }
        case SUCCESS_DELETE_INDICATORTYPE:
            return {
                ...state,
                indicatorTypeLists: state.indicatorTypeLists.filter((item) => parseInt(item.id) !== parseInt(action.payload.id)),
            };

        case SUCCESS_GET_DESCRIPTION:
            return {
                ...state, ...action.payload
            }

        case SUCCESS_SAVE_DESCRIPTION:
            return {
                ...state, descriptionLists: [...state.descriptionLists, { ...action.payload }]
            }
        case SUCCESS_UPDATE_DESCRIPTION:
            index = state.descriptionLists.indexOf(state.descriptionLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.descriptionLists];
            if (index > -1) {
                newlist[index].description = action.payload.description;
            }
            return { ...state, descriptionLists: newlist }
        case SUCCESS_DELETE_DESCRIPTION:
            return {
                ...state,
                descriptionLists: state.descriptionLists.filter((item) => parseInt(item.id) !== parseInt(action.payload.id)),
            };

        case SUCCESS_GET_INDICATORMAPPING:
            return {
                ...state, ...action.payload
            }

        case SUCCESS_SAVE_INDICATORMAPPING:
            return {
                ...state, indicatorMappingLists: [...state.indicatorMappingLists, { ...action.payload }]
            }
        case SUCCESS_UPDATE_INDICATORMAPPING:
            index = state.indicatorMappingLists.indexOf(state.indicatorMappingLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.indicatorMappingLists];
            if (index > -1) {
                newlist[index].indicator_id = action.payload.indicator_id;
                newlist[index].description_id = action.payload.description_id;
                newlist[index].indicator_descvalue = action.payload.indicator_descvalue;
            }
            return { ...state, indicatorMappingLists: newlist }
        case SUCCESS_DELETE_INDICATORMAPPING:
            return {
                ...state,
                indicatorTypeLists: state.indicatorMappingLists.filter((item) => parseInt(item.id) !== parseInt(action.payload.id)),
            };

        case SUCCESS_GET_INDICATOR:
            return {
                ...state, ...action.payload
            }

        case SUCCESS_SAVE_INDICATOR:
            return {
                ...state, indicatorLists: [...state.indicatorLists, { ...action.payload }]
            }
        case SUCCESS_UPDATE_INDICATOR:
            index = state.indicatorLists.indexOf(state.indicatorLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.indicatorLists];
            if (index > -1) {
                newlist[index].indicator = action.payload.indicator;
                newlist[index].indicator_type_id = action.payload.indicator_type_id;
                newlist[index].sort_order = action.payload.sort_order;
            }
            return { ...state, indicatorLists: newlist }
        case SUCCESS_DELETE_INDICATOR:
            return {
                ...state,
                indicatorLists: state.indicatorLists.filter((item) => parseInt(item.id) !== parseInt(action.payload.id)),
            };
        default:
            return state
    }
}


export default indicators;