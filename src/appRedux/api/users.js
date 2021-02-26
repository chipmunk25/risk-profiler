import API from './root';

export function* Login(data) {
    try {
        return yield API().post(`/users/login`, { ...data })
    } catch (error) {
        return yield error.response
    }
}
export function* Logout() {
    try {
        return yield API().post(`/users/logout`)
    } catch (error) {
        return yield error.response
    }
}


export function* UpdatePassword(token, id, data) {
    try {
        return yield API().patch(`/users/${id}/changepwd`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* ResetPswd(token, email, data) {
    try {
        return yield API().patch(`/users/${email}/resetpwd`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* UpdateUser(token, id, data) {
    try {
        return yield API().patch(`/users/${id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* getUsersFromApi(token, { branch_id, company_id, user_status }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/users/${user_status}`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getSMSBalFromApi(token) {
    try {
        return yield API().get(`/companies/sms/balance`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* getRoleFromApi(token, { branch_id, company_id, del_flg }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/users/${del_flg}/roles`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getBranchesFromApi(token, { del_flg, company_id }) {
    try {
        return yield API().get(`/companies/branch/${company_id}/${del_flg}`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateBranch(token, data) {

    try {
        return yield API().post(`/companies/branch`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* ChangeBranch(token, data) {
    // console.log(data)
    try {
        return yield API().patch(`/companies/branch/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* RemoveBranch(token, id) {
    try {
        return yield API().delete(`/companies/branch/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* RemoveUser(token, id) {
    try {
        return yield API().delete(`/users/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* CreateUser(token, data) {
    try {
        return yield API().post(`/users`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}
