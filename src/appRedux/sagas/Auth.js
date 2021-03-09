import { all, call, fork, put, takeLatest, takeEvery } from "redux-saga/effects";

import {
    SIGNIN_USER, SIGNOUT_USER, REQUEST_UPDATEPASSWORD, REQUEST_UPDATEUSER, REQUEST_GET_BRANCH, REQUEST_DELETE_USER,
    REQUEST_GET_USERS, REQUEST_RESETPASSWORD, REQUEST_DELETE_BRANCH, REQUEST_UPDATE_BRANCH, REQUEST_SAVE_BRANCH,
    REQUEST_SAVE_USER, REQUEST_UPDATEUSERS,
    REQUEST_SAVE_PERMISSION, REQUEST_GET_ROLE, REQUEST_UPDATE_PERMISSION, REQUEST_DELETE_PERMISSION,
    REQUEST_GET_PERMISSION, REQUEST_SAVE_ROLE, REQUEST_UPDATE_ROLE, REQUEST_DELETE_ROLE,
} from "../Actions/constants"
import {
    signInUserSuccess, signOutUserSuccess, successGetBranch, successUpdatePassword, successUpdateUser, successUpdateUsers,
    successGetUsers, successResetPassword, successDeleteBranch, successUpdateBranch, successSaveBranch,
    successGetRole, successSaveUser, successDeleteUser, successDeletePermission, successUpdatePermission,
    successSavePermission, successGetPermission, successUpdateRole, successDeleteRole, successSaveRole,

} from "../Actions/auth"
import { hideAuthLoader, hideModal } from "../Actions/common"
import {
    Login, Logout, UpdatePassword, UpdateUser, getBranchesFromApi, getUsersFromApi,
    ResetPswd, CreateBranch, ChangeBranch, RemoveBranch, getRoleFromApi, CreateUser, RemoveUser,
    CreateRole, ChangeRole, RemoveRole, getPermissionFromApi, CreatePermission, ChangePermission, RemovePermission
} from "../api/users"
import jwtDecode from "jwt-decode"
import AlertMessage from "components/Alert/message"
import openNotificationWithIcon from 'components/Alert/notification';
function* LoginUser(data) {
    return yield Login(data)
}
function* SignInUserHandler({ payload }) {
    try {
        const signInUser = yield call(LoginUser, payload);
        if (signInUser) {
            if (signInUser.status === 200) {
                yield put(hideAuthLoader())
                const token = signInUser.data.token
                const decode = jwtDecode(token)
                const user = { ...decode }
                // console.log(user)
                const authUser = yield user.id
                yield sessionStorage.setItem('role_id', user.role_id);
                yield sessionStorage.setItem('user_id', authUser);
                yield sessionStorage.setItem('token', token);
                yield sessionStorage.setItem('user_info', JSON.stringify(user));
                yield put(signInUserSuccess({ authUser, user, role_id: user.role_id }));

            } else {
                yield put(hideAuthLoader())
                openNotificationWithIcon('error', 'Error', signInUser.data.message)
            }
        }
        else {
            yield put(hideAuthLoader())
            openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
        }
    } catch (error) {
        // yield put(showAuthMessage(error));
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}

function* signOutRequest() {
    return yield Logout()
}

function* signOut({ payload }) {
    try {
        yield put(signOutUserSuccess(undefined));
        yield put(hideAuthLoader())
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('user_info');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role_id');
        const user = yield call(signOutRequest);
        if (user.status === 200) {
            yield AlertMessage("success", user.data.message, "success", 2)
        }

    } catch (error) {
        //  yield put(showAuthMessage(error));
    }
}

function* chgPwd(data) {
    return yield UpdatePassword(sessionStorage.getItem('token'), data.id, data)
}

function* ChangePasswordHandler({ payload }) {
    const users = yield call(chgPwd, payload)
    yield put(hideAuthLoader())
    if (users.status === 201) {
        yield put(successUpdatePassword(users.data.user))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', users.error)
    }
}

function* ResetPwdHandler({ payload }) {
    const users = yield call(ResetPswd, sessionStorage.getItem('token'), payload.email, payload)
    yield put(hideAuthLoader())
    if (users.status === 201) {
        yield put(successResetPassword(users.data.user))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', users.error)
    }
}


function* UpdateExistUser(data) {
    return yield UpdateUser(sessionStorage.getItem('token'), data.id, data)
}

function* UpdateUserInfoHandler({ payload }) {
    const users = yield call(UpdateExistUser, payload)
    yield put(hideAuthLoader())
    if (users.status === 201) {
        if (parseInt(users.data.user.id) === parseInt(sessionStorage.getItem('user_id'))) {
            yield sessionStorage.setItem('user_info', JSON.stringify(users.data.user));
            yield put(successUpdateUser(users.data.user))
        }
        yield put(successUpdateUsers(users.data.user))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
        yield put(hideModal())
    }
    else {
        openNotificationWithIcon('error', 'Error', users.error)
    }
}

function* UpdateUsersInfoHandler({ payload }) {
    const users = yield call(UpdateExistUser, payload)
    yield put(hideAuthLoader())
    if (users.status === 201) {
        yield put(successUpdateUsers(users.data.user))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
        yield put(hideModal())
    }
    else {
        openNotificationWithIcon('error', 'Error', users.error)
    }
}


function* GetUsersHandler({ payload }) {
    let company = yield call(getUsersFromApi, sessionStorage.getItem('token'), payload)
    // console.log(company)
    if (company) {
        if (company.status === 200) {
            yield put(successGetUsers({
                userLists: company.data.users,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', company.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}

function* GetRolesHandler({ payload }) {
    let company = yield call(getRoleFromApi, sessionStorage.getItem('token'), payload)
    // console.log(company)
    if (company) {
        if (company.status === 200) {
            yield put(successGetRole({
                roleLists: company.data.roles,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', company.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* GetBranchHandler({ payload }) {
    let company = yield call(getBranchesFromApi, sessionStorage.getItem('token'), payload)
    // console.log(company)
    if (company) {
        if (company.status === 200) {
            yield put(successGetBranch({
                branchLists: company.data.branch,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', company.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}



function* SaveBranchHandler({ payload }) {
    const branch = yield call(CreateBranch, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (branch.status === 201) {
        yield put(successSaveBranch(branch.data.branch))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    } else if (branch.status === 422) {
        openNotificationWithIcon('error', 'Error', branch.data.message)
    }
    else {
        openNotificationWithIcon('error', 'Error', branch.error)
    }
}

function* UpdateBranchHandler({ payload }) {
    const branch = yield call(ChangeBranch, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (branch.status === 201) {
        yield put(successUpdateBranch(branch.data.branch))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', branch.error)
    }
}

function* DeleteBranchHandler({ payload }) {
    const branch = yield call(RemoveBranch, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (branch.status === 201) {
        yield put(successDeleteBranch(branch.data.branch))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', branch.error)
    }
}



function* SaveUserHandler({ payload }) {
    const branch = yield call(CreateUser, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (branch.status === 201) {
        yield put(successSaveUser(branch.data.users))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    } else if (branch.status === 422) {
        openNotificationWithIcon('error', 'Error', branch.data.message)
    }
    else {
        openNotificationWithIcon('error', 'Error', branch.error)
    }
}



function* DeleteUserHandler({ payload }) {
    const branch = yield call(RemoveUser, sessionStorage.getItem('token'), payload)
    // console.log(branch, payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (branch.status === 201) {
        yield put(successDeleteUser(branch.data.user))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', branch.error)
    }
}

function* GetRoleHandler({ payload }) {
    let users = yield call(getRoleFromApi, sessionStorage.getItem('token'), payload)

    if (users) {
        if (users.status === 200) {
            yield put(successGetRole({
                roleLists: users.data.roles,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', users.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* SaveRoleHandler({ payload }) {
    // console.log(payload)
    const users = yield call(CreateRole, sessionStorage.getItem('token'), payload)
    // console.log(users)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (users.status === 201) {
        yield put(successSaveRole(users.data.role))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    } else if (users.status === 422) {
        openNotificationWithIcon('error', 'Error', users.data.message)
    }
    else {
        openNotificationWithIcon('error', 'Error', users.error)
    }
}

function* UpdateRoleHandler({ payload }) {
    const users = yield call(ChangeRole, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (users.status === 201) {
        yield put(successUpdateRole(users.data.role))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', users.error)
    }
}

function* DeleteRoleHandler({ payload }) {
    const users = yield call(RemoveRole, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (users.status === 201) {
        yield put(successDeleteRole(users.data.role))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', users.error)
    }
}


function* GetPermissionHandler({ payload }) {
    let users = yield call(getPermissionFromApi, sessionStorage.getItem('token'), payload)
    //  console.log(users) 
    if (users) {
        if (users.status === 200) {
            yield put(successGetPermission({
                permissionLists: users.data.permissions,
            }));
            yield put(hideAuthLoader())
        } else {
            openNotificationWithIcon('error', 'Error', users.error)
        }
    } else {
        openNotificationWithIcon('error', 'Internet Error', "Check your Internet, Cannot Load Information Due to No Internet")
    }
}


function* SavePermissionHandler({ payload }) {
    // console.log(payload)
    const users = yield call(CreatePermission, sessionStorage.getItem('token'), payload)
    //  console.log(users) 
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (users.status === 201) {
        yield put(successSavePermission(users.data.permission))
        openNotificationWithIcon("success", 'Success', 'Record Saved Successfully')
    } else if (users.status === 422) {
        openNotificationWithIcon('error', 'Error', users.data.message)
    }
    else {
        openNotificationWithIcon('error', 'Error', users.error)
    }
}

function* UpdatePermissionHandler({ payload }) {
    const users = yield call(ChangePermission, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (users.status === 201) {
        yield put(successUpdatePermission(users.data.permission))
        openNotificationWithIcon("success", 'Success', 'Record Updated Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', users.error)
    }
}

function* DeletePermissionHandler({ payload }) {
    const users = yield call(RemovePermission, sessionStorage.getItem('token'), payload)
    yield put(hideAuthLoader())
    yield put(hideModal())
    if (users.status === 201) {
        yield put(successDeletePermission(users.data.permission))
        openNotificationWithIcon("success", 'Success', 'Record Deleted Successfully')
    }
    else {
        openNotificationWithIcon('error', 'Error', users.error)
    }
}






export function* signInUser() {
    yield takeLatest(SIGNIN_USER, SignInUserHandler);
}


export function* signOutUser() {
    yield takeLatest(SIGNOUT_USER, signOut);
}

export function* UsersWatcher() {
    yield takeEvery(REQUEST_UPDATEPASSWORD, ChangePasswordHandler)
    yield takeEvery(REQUEST_RESETPASSWORD, ResetPwdHandler)
    yield takeEvery(REQUEST_UPDATEUSER, UpdateUserInfoHandler)
    yield takeEvery(REQUEST_UPDATEUSERS, UpdateUsersInfoHandler)
    yield takeEvery(REQUEST_GET_USERS, GetUsersHandler)
    yield takeEvery(REQUEST_GET_BRANCH, GetBranchHandler)
    yield takeEvery(REQUEST_GET_ROLE, GetRolesHandler)
    yield takeEvery(REQUEST_SAVE_BRANCH, SaveBranchHandler)
    yield takeEvery(REQUEST_SAVE_USER, SaveUserHandler)
    yield takeEvery(REQUEST_UPDATE_BRANCH, UpdateBranchHandler)
    yield takeEvery(REQUEST_DELETE_BRANCH, DeleteBranchHandler)
    yield takeEvery(REQUEST_DELETE_USER, DeleteUserHandler)
}

function* LoadWatchers() {
    yield takeEvery(REQUEST_GET_ROLE, GetRoleHandler)
    yield takeEvery(REQUEST_GET_PERMISSION, GetPermissionHandler)
}


export function* ActionWatchers() {
    yield takeEvery(REQUEST_SAVE_ROLE, SaveRoleHandler)
    yield takeEvery(REQUEST_UPDATE_ROLE, UpdateRoleHandler)
    yield takeEvery(REQUEST_DELETE_ROLE, DeleteRoleHandler)

    yield takeEvery(REQUEST_SAVE_PERMISSION, SavePermissionHandler)
    yield takeEvery(REQUEST_UPDATE_PERMISSION, UpdatePermissionHandler)
    yield takeEvery(REQUEST_DELETE_PERMISSION, DeletePermissionHandler)


}

export default function* rootSaga() {
    yield all([
        fork(signInUser),
        fork(signOutUser),
        fork(UsersWatcher),
        fork(LoadWatchers),
        fork(ActionWatchers),

    ]);
}
