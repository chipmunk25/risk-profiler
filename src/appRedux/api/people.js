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
        return yield API().patch(`/people/customer/${data.customer_no}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* RemoveCustomer(token, customer_no) {
    try {
        return yield API().delete(`/people/customer/${customer_no}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}
