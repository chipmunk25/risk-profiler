import { ON_SHOW_LOADER, ON_HIDE_LOADER, ON_SHOW_MODAL, ON_HIDE_MODAL, TOGGLE_COLLAPSED_NAV } from "../Actions/constants"
const INIT_STATE = {
    loader: false,
    modal: false,
    error: "",
    loading: false,
    message: '',
    navCollapsed: true,
    pathname: '/',
}
const Common = (state = INIT_STATE, action) => {
    switch (action.type) {
        case ON_SHOW_LOADER: {
            return { ...state, loader: true }
        }
        case ON_SHOW_MODAL: {
            return { ...state, modal: true }
        }
        case ON_HIDE_MODAL: {
            return { ...state, modal: false }
        }
        case ON_HIDE_LOADER: {
            return { ...state, loader: false }
        }
        case '@@router/LOCATION_CHANGE': {
            return {
                ...state,
                pathname: action.payload.location.pathname,
                navCollapsed: false
            }
        }
        case TOGGLE_COLLAPSED_NAV: {
            return {
                ...state,
                navCollapsed: action.navCollapsed
            }
        }
        default:
            return state;
    }
}

export default Common