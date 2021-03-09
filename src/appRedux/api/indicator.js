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

export function* getReviewFromApi(token, { company_id, del_flg }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)

    try {
        return yield API().get(`/indicators/${del_flg}/review`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateReview(token, data) {
    try {
        return yield API().post(`/indicators/review`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* ChangeReview(token, data) {
    try {
        return yield API().patch(`/indicators/review/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* RemoveReview(token, id) {
    try {
        return yield API().delete(`/indicators/review/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getCustomerReviewFromApi(token, { company_id, del_flg }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)

    try {
        return yield API().get(`/indicators/${del_flg}/custreview`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateCustomerReview(token, data) {
    try {
        return yield API().post(`/indicators/custreview`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* ChangeCustomerReview(token, data) {
    try {
        return yield API().patch(`/indicators/custreview/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* RemoveCustomerReview(token, id) {
    try {
        return yield API().delete(`/indicators/custreview/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getCustomerProfilerFromApi(token, { company_id, del_flg }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)

    try {
        return yield API().get(`/indicators/${del_flg}/profiler`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getCustomerProfilerSummaryFromApi(token, { branch_id, company_id, del_flg }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)
    params.append('branch_id', branch_id)

    try {
        return yield API().get(`/indicators/profiler/${del_flg}/summary`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* CreateCustomerProfiler(token, data) {
    try {
        return yield API().post(`/indicators/profiler/bulk`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* ChangeCustomerProfiler(token, data) {
    try {
        return yield API().patch(`/indicators/profiler/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* RemoveCustomerProfiler(token, id) {
    try {
        return yield API().delete(`/indicators/profiler/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
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