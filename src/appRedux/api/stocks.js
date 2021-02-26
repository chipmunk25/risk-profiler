import API from './root';

export function* getStockByDateFromApi(token, { from_date, to_date, del_flg, action_type, company_id, branch_id, storage_type, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    params.append('del_flg', del_flg)
    params.append('action_type', action_type)
    params.append('storage_type', storage_type)
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/sos/stocks/${from_date}/${to_date}/entries`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getStockByDateSupplierFromApi(token, { supplier_id, from_date, to_date, del_flg, action_type, company_id, branch_id, storage_type, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    params.append('del_flg', del_flg)
    params.append('action_type', action_type)
    params.append('storage_type', storage_type)
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/sos/stocks/${from_date}/${to_date}/${supplier_id}/entries`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getStockBySupplierFromApi(token, { supplier_id, del_flg, action_type, company_id, branch_id, storage_type, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    params.append('del_flg', del_flg)
    params.append('action_type', action_type)
    params.append('storage_type', storage_type)
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)
    try {
        return yield API().get(`/sos/stocks/${supplier_id}/entries`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* CreateStock(token, data) {
    try {
        return yield API().post(`/sos/stock`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* ChangeStock(token, data) {
    try {
        return yield API().patch(`/sos/stock/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* RemoveStock(token, id) {
    try {
        return yield API().delete(`/sos/stock/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getWarehouseFromApi(token, { del_flg, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    try {
        return yield API().get(`/sos/warehouses/${del_flg}`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateWarehouse(token, data) {
    try {
        return yield API().post(`/sos/warehouse`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* ChangeWarehouse(token, data) {
    try {
        return yield API().patch(`/sos/warehouse/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* RemoveWarehouse(token, id) {
    try {
        return yield API().delete(`/sos/warehouse/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* CreateMovement(token, data) {
    try {
        return yield API().post(`/sos/movement`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}
export function* CreateStockTransfer(token, data) {
    try {
        return yield API().post(`/sos/transfer`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* CreateMovementAuthorize(token, data) {
    try {
        return yield API().post(`/sos/movement/authorize`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* CreateStockTransferAuthorize(token, data) {
    try {
        return yield API().post(`/sos/transfer/authorize`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getPendingMovementStockFromApi(token, { company_id, branch_id }) {

    try {
        return yield API().get(`/sos/stocks/${company_id}/${branch_id}/pendingmovement`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getPendingMovementSummaryFromApi(token, { company_id, branch_id }) {

    try {
        return yield API().get(`/sos/stocks/${company_id}/${branch_id}/pendingmovementsummary`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getPendingStockTransferFromApi(token, { company_id, branch_id }) {

    try {
        return yield API().get(`/sos/stocks/${company_id}/${branch_id}/pendingtransfer`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}
export function* getPendingStockTransferSummaryFromApi(token, { company_id, branch_id }) {

    try {
        return yield API().get(`/sos/stocks/${company_id}/${branch_id}/pendingtransfersummary`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getAvailableStockFromApi(token, { company_id, branch_id }) {

    try {
        return yield API().get(`/sos/stocks/${company_id}/${branch_id}/available`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getWarehouseStockFromApi(token, { company_id, branch_id }) {

    try {
        return yield API().get(`/sos/stocks/${company_id}/${branch_id}/warehouse`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

