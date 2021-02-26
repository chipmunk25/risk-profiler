import API from './root';
/* export function* getProfomaFromApi(token, { del_flg, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    try {
        return yield API().get(`/sos/profomas/${del_flg}`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
} */

export function* getProfomaByDateFromApi(token, { from_date, to_date, del_flg, action_type, company_id, branch_id, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    params.append('del_flg', del_flg)
    params.append('action_type', action_type)
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/sos/profomas/${from_date}/${to_date}/entries`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getProfomaByDateCustomerFromApi(token, { customer_id, from_date, to_date, del_flg, action_type, company_id, branch_id, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    params.append('del_flg', del_flg)
    params.append('action_type', action_type)
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/sos/profomas/${from_date}/${to_date}/${customer_id}/entries`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getProfomaByCustomerFromApi(token, { customer_id, del_flg, action_type, company_id, branch_id, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    params.append('del_flg', del_flg)
    params.append('action_type', action_type)
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/sos/profomas/${customer_id}/entries`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getProfomaPendingFromApi(token, { status_id, del_flg, action_type, company_id, branch_id, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    params.append('del_flg', del_flg)
    params.append('action_type', action_type)
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    params.append('status_id', status_id)
    try {
        return yield API().get(`/sos/profomas`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}



export function* getSalesListsByDateFromApi(token, { from_date, to_date, del_flg, action_type, company_id, branch_id, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    params.append('del_flg', del_flg)
    params.append('action_type', action_type)
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/sos/saleslists/${from_date}/${to_date}/entries`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getCashListsByDateFromApi(token, { from_date, to_date, cl_id, del_flg, action_type, company_id, branch_id }) {
    const params = new URLSearchParams();
    params.append('del_flg', del_flg)
    params.append('action_type', action_type)
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    params.append('cl_id',  JSON.stringify(cl_id))
    try {
        return yield API().get(`/sos/cash/${from_date}/${to_date}/ledger`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getSalesListsByDateCustomerFromApi(token, { customer_id, from_date, to_date, del_flg, action_type, company_id, branch_id, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    params.append('del_flg', del_flg)
    params.append('action_type', action_type)
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/sos/saleslists/${from_date}/${to_date}/${customer_id}/entries`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getSalesListsByCustomerFromApi(token, { customer_id, del_flg, action_type, company_id, branch_id, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    params.append('del_flg', del_flg)
    params.append('action_type', action_type)
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/sos/saleslists/${customer_id}/entries`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* getSalesListsFromApi(token, { status_id, del_flg, action_type, company_id, branch_id, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    params.append('del_flg', del_flg)
    params.append('action_type', action_type)
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    params.append('status_id', status_id)
    try {
        return yield API().get(`/sos/saleslists`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateProfoma(token, data) {
    try {
        return yield API().post(`/sos/profoma`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* ChangeProfoma(token, data) {
    try {
        return yield API().patch(`/sos/profoma/${data.order_code}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* RemoveProfoma(token, order_code) {
    try {
        return yield API().delete(`/sos/profoma/${order_code}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}



export function* CreateSales(token, data) {
    try {
        return yield API().post(`/sos/sales`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* CreateCash(token, data) {
    try {
        return yield API().post(`/sos/cash`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* getDailySalesFromApi(token, { sale_date, created_user, company_id, branch_id }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    params.append('created_user', created_user)
    try {
        return yield API().get(`/sos/sales/${sale_date}/daily`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getPerodicSalesFromApi(token, { trans_type, sale_date, from_date, to_date, created_user, company_id, branch_id }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    params.append('created_user', created_user)
    params.append('trans_type', trans_type)
    try {
        return yield API().get(`/sos/sales/${from_date}/${to_date}/${sale_date}/perodic`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* getBillsDueFromApi(token, { company_id, branch_id }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/sos/sales/billsdue`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getTopCustomerFromApi(token, { company_id, branch_id }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/sos/sales/topcustomer`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}
