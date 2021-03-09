//getCategoryFromApi
import API from './root';

export function* CreateStatus(token, data) {
    try {
        return yield API().post(`/status`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* ChangeStatus(token, data) {
    try {
        return yield API().patch(`/status/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* RemoveStatus(token, id) {
    try {
        return yield API().delete(`/status/${id}/soft`, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* getStatusFromApi(token, { del_flg, company_id }) {
    try {
        return yield API().get(`/status/${company_id}/${del_flg}`, {  headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}



