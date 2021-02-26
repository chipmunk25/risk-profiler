//getCategoryFromApi
import API from './root';
export function* getCategoryFromApi(token, { del_flg, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    try {
        return yield API().get(`/products/categories/${del_flg}`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateCategory(token, data) {
    // console.log(data)
    try {
        return yield API().post(`/products/category`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* ChangeCategory(token, data) {
    // console.log(data)
    try {
        return yield API().patch(`/products/category/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* RemoveCategory(token, id) {
    try {
        return yield API().delete(`/products/category/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getUnitFromApi(token, { del_flg, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    try {
        return yield API().get(`/products/units/${del_flg}`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* CreateUnit(token, data) {
    try {
        return yield API().post(`/products/unit`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* ChangeUnit(token, data) {
    try {
        return yield API().patch(`/products/unit/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* RemoveUnit(token, id) {
    try {
        return yield API().delete(`/products/unit/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getProductFromApi(token, { del_flg, page, size }) {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    try {
        return yield API().get(`/products/${del_flg}`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getStatusFromApi(token, { del_flg, company_id }) {
    try {
        return yield API().get(`/products/status/${company_id}/${del_flg}`, {  headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* CreateProduct(token, data) {
    try {
        return yield API().post(`/products`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* CreateMultipleProduct(token, data) {
    try {
        return yield API().post(`/products/bulk`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* ChangeProduct(token, data) {
    try {
        return yield API().patch(`/products/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* RemoveProduct(token, id) {
    try {
        return yield API().delete(`/products/${id}/hard`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}
