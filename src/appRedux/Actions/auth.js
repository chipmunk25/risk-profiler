
import { createAction } from "redux-actions";
import {
  SIGNIN_USER, SIGNIN_USER_SUCCESS, INIT_URL, SIGNOUT_USER, SIGNOUT_USER_SUCCESS,
  REQUEST_UPDATEPASSWORD, SUCCESS_UPDATEPASSWORD, REQUEST_UPDATEUSER, SUCCESS_UPDATEUSER,
  REQUEST_GET_BRANCH, SUCCESS_GET_BRANCH, REQUEST_GET_USERS, SUCCESS_GET_USERS, REQUEST_RESETPASSWORD,
  REQUEST_GET_PERMISSION, REQUEST_SAVE_PERMISSION, REQUEST_UPDATE_PERMISSION, REQUEST_DELETE_PERMISSION,
  REQUEST_SAVE_ROLE, REQUEST_UPDATE_ROLE, REQUEST_DELETE_ROLE,
  SUCCESS_RESETPASSWORD, REQUEST_SAVE_BRANCH, SUCCESS_SAVE_BRANCH, REQUEST_UPDATE_BRANCH,
  SUCCESS_UPDATE_BRANCH, REQUEST_DELETE_BRANCH, SUCCESS_DELETE_BRANCH, REQUEST_GET_ROLE, SUCCESS_GET_ROLE,
  REQUEST_SAVE_USER, SUCCESS_SAVE_USER, REQUEST_DELETE_USER, SUCCESS_DELETE_USER, SUCCESS_UPDATEUSERS, REQUEST_UPDATEUSERS,
  SUCCESS_GET_PERMISSION, SUCCESS_SAVE_PERMISSION, SUCCESS_UPDATE_PERMISSION, SUCCESS_DELETE_PERMISSION, SUCCESS_SAVE_ROLE,
  SUCCESS_UPDATE_ROLE, SUCCESS_DELETE_ROLE
} from "./constants"

export const signInUser = createAction(SIGNIN_USER)
export const signInUserSuccess = createAction(SIGNIN_USER_SUCCESS)


export const signOutUser = createAction(SIGNOUT_USER)
export const signOutUserSuccess = createAction(SIGNOUT_USER_SUCCESS)

export const requestUpdatePassword = createAction(REQUEST_UPDATEPASSWORD);
export const successUpdatePassword = createAction(SUCCESS_UPDATEPASSWORD);

export const requestUpdateUser = createAction(REQUEST_UPDATEUSER);
export const successUpdateUser = createAction(SUCCESS_UPDATEUSER);
export const requestUpdateUsers = createAction(REQUEST_UPDATEUSERS);
export const successUpdateUsers = createAction(SUCCESS_UPDATEUSERS);

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};


export const requestGetBranch = createAction(REQUEST_GET_BRANCH);
export const successGetBranch = createAction(SUCCESS_GET_BRANCH);

export const requestSaveBranch = createAction(REQUEST_SAVE_BRANCH);
export const successSaveBranch = createAction(SUCCESS_SAVE_BRANCH);
export const requestUpdateBranch = createAction(REQUEST_UPDATE_BRANCH);
export const successUpdateBranch = createAction(SUCCESS_UPDATE_BRANCH);
export const requestDeleteBranch = createAction(REQUEST_DELETE_BRANCH);
export const successDeleteBranch = createAction(SUCCESS_DELETE_BRANCH);

export const requestGetUsers = createAction(REQUEST_GET_USERS);
export const successGetUsers = createAction(SUCCESS_GET_USERS);

export const requestSaveUser = createAction(REQUEST_SAVE_USER);
export const successSaveUser = createAction(SUCCESS_SAVE_USER);
export const requestDeleteUser = createAction(REQUEST_DELETE_USER);
export const successDeleteUser = createAction(SUCCESS_DELETE_USER);


export const requestResetPassword = createAction(REQUEST_RESETPASSWORD)
export const successResetPassword = createAction(SUCCESS_RESETPASSWORD)

 
export const requestGetPermission = createAction(REQUEST_GET_PERMISSION);
export const successGetPermission = createAction(SUCCESS_GET_PERMISSION);
export const requestSavePermission = createAction(REQUEST_SAVE_PERMISSION);
export const successSavePermission = createAction(SUCCESS_SAVE_PERMISSION);
export const requestUpdatePermission = createAction(REQUEST_UPDATE_PERMISSION);
export const successUpdatePermission = createAction(SUCCESS_UPDATE_PERMISSION);
export const requestDeletePermission = createAction(REQUEST_DELETE_PERMISSION);
export const successDeletePermission = createAction(SUCCESS_DELETE_PERMISSION);
 
export const requestGetRole = createAction(REQUEST_GET_ROLE);
export const successGetRole = createAction(SUCCESS_GET_ROLE);
export const requestSaveRole = createAction(REQUEST_SAVE_ROLE);
export const successSaveRole = createAction(SUCCESS_SAVE_ROLE);
export const requestUpdateRole = createAction(REQUEST_UPDATE_ROLE);
export const successUpdateRole = createAction(SUCCESS_UPDATE_ROLE);
export const requestDeleteRole = createAction(REQUEST_DELETE_ROLE);
export const successDeleteRole = createAction(SUCCESS_DELETE_ROLE);