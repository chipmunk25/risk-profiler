import {
    SIGNIN_USER_SUCCESS, INIT_URL, SIGNOUT_USER_SUCCESS, SUCCESS_UPDATEUSER, SUCCESS_GET_BRANCH, SUCCESS_GET_ROLE, SUCCESS_GET_USERS,
    SUCCESS_SAVE_BRANCH, SUCCESS_UPDATE_BRANCH, SUCCESS_DELETE_BRANCH, SUCCESS_SAVE_USER, SUCCESS_DELETE_USER, SUCCESS_UPDATEUSERS,
    SUCCESS_SMSBAL,
} from "../Actions/constants"
const INIT_STATE = {
    initURL: '',
    authUser: sessionStorage.getItem('user_id'),
    user: JSON.parse(sessionStorage.getItem('user_info')),
    userLists: [],
    branchLists: [],
    role_id: sessionStorage.getItem('role_id'),
    userStatusLists: ['ACTIVE', 'INACTIVE', 'LOCKED', 'REMOVED'],
    smsbal: 0
};
let newlist, index
const Auth = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SIGNIN_USER_SUCCESS: {
            return {
                ...state,
                loader: false,
                authUser: action.payload.authUser,
                user: action.payload.user,
                role_id: action.payload.role_id,
            }
        }
        case INIT_URL: {
            return {
                ...state,
                initURL: action.payload
            }
        }

        case SIGNOUT_USER_SUCCESS: {
            return {
                ...state,
                role_id: null,
                authUser: null,
                initURL: '/',
                loader: false
            }
        }
        case SUCCESS_UPDATEUSERS: {
            index = state.userLists.indexOf(state.userLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.userLists];
            // console.log(action.payload,newlist[index])
            if (index > -1) {
                newlist[index].fullname = action.payload.fullname;
                newlist[index].telephone = action.payload.telephone;
                newlist[index].address = action.payload.address;
                newlist[index].email = action.payload.email;
                newlist[index].branch_id = action.payload.branch_id;
                newlist[index].company_id = action.payload.company_id;
                newlist[index].role_id = action.payload.role_id;
                newlist[index].user_status = action.payload.user_status;
            }
            return { ...state, userLists: newlist }

        }
        case SUCCESS_UPDATEUSER: {
            return {
                ...state,
                user: action.payload
            }
        }
        case SUCCESS_SAVE_USER:
            return {
                ...state, userLists: [...state.userLists, { ...action.payload }]
            }
        case SUCCESS_DELETE_USER:
            index = state.userLists.indexOf(state.userLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.userLists];
            if (index > -1) {
                newlist[index].user_status = "REMOVED";
            }
            return { ...state, userLists: newlist }
        case SUCCESS_GET_BRANCH:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_GET_ROLE:
            return {
                ...state, ...action.payload
            }
        case SUCCESS_SMSBAL:
            return {
                ...state, ...action.payload
            }

        case SUCCESS_UPDATE_BRANCH:
            index = state.branchLists.indexOf(state.branchLists.find(item => parseInt(action.payload.id) === parseInt(item.id)));
            newlist = [...state.branchLists];
            if (index > -1) {
                newlist[index].branch_name = action.payload.branch_name;
                newlist[index].telephone = action.payload.telephone;
                newlist[index].address = action.payload.address;
                newlist[index].email = action.payload.email;
            }
            return { ...state, branchLists: newlist }
        case SUCCESS_SAVE_BRANCH:
            return {
                ...state, branchLists: [...state.branchLists, { ...action.payload }]
            }
        case SUCCESS_DELETE_BRANCH:
            return {
                ...state,
                branchLists: state.branchLists.filter((item) => item.id !== action.payload.id),
            };
        case SUCCESS_GET_USERS:
            return {
                ...state, ...action.payload
            }
        default:
            return state;
    }
}
export default Auth;