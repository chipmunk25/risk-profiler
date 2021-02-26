import API from './root';

export function* getIndicatorTypeFromApi(token, { company_id, del_flg }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)

    try {
        return yield API().get(`/indicators/${del_flg}/type`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateIndicatorType(token, data) {
    try {
        return yield API().post(`/indicators/type`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* ChangeIndicatorType(token, data) {
    try {
        return yield API().patch(`/indicators/type/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* RemoveIndicatorType(token, id) {
    try {
        return yield API().delete(`/indicators/type/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getIndicatorMappingFromApi(token, { company_id, del_flg }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)

    try {
        return yield API().get(`/indicators/${del_flg}/mapping`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateIndicatorMapping(token, data) {
    try {
        return yield API().post(`/indicators/mapping`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* ChangeIndicatorMapping(token, data) {
    try {
        return yield API().patch(`/indicators/mapping/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* RemoveIndicatorMapping(token, id) {
    try {
        return yield API().delete(`/indicators/mapping/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getIndicatorFromApi(token, { company_id, del_flg }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)

    try {
        return yield API().get(`/indicators/${del_flg}`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateIndicator(token, data) {
    try {
        return yield API().post(`/indicators`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* ChangeIndicator(token, data) {
    try {
        return yield API().patch(`/indicators/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* RemoveIndicator(token, id) {
    try {
        return yield API().delete(`/indicators/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getDescriptionFromApi(token, { company_id, del_flg }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)

    try {
        return yield API().get(`/indicators/${del_flg}/description`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateDescription(token, data) {
    try {
        return yield API().post(`/indicators/description`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* ChangeDescription(token, data) {
    try {
        return yield API().patch(`/indicators/description/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* RemoveDescription(token, id) {
    try {
        return yield API().delete(`/indicators/description/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}