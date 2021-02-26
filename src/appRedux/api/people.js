import API from './root';
export function* getCustomerFromApi(token, { del_flg,company_id,branch_id, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    try {
        return yield API().get(`/people/customers/${del_flg}/${company_id}/${branch_id}`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateCustomer(token, data) {
   // // console.log(data)
    try {
        return yield API().post(`/people/customer`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* ChangeCustomer(token, data) {
    try {
        return yield API().patch(`/people/customer/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* RemoveCustomer(token, id) {
    try {
        return yield API().delete(`/people/customer/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getSupplierFromApi(token, { del_flg,company_id,branch_id, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    try {
        return yield API().get(`/people/suppliers/${del_flg}/${company_id}/${branch_id}`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateSupplier(token, data) {
  //  // console.log(data)
    try {
        return yield API().post(`/people/supplier`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* ChangeSupplier(token, data) {
    try {
        return yield API().patch(`/people/supplier/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* RemoveSupplier(token, id) {
    try {
        return yield API().delete(`/people/supplier/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}
