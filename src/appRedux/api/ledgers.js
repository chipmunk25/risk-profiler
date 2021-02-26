import API from './root';

export function* getLedgerHeadFromApi(token, { company_id, del_flg }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)

    try {
        return yield API().get(`/ledgers/${del_flg}/achead`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* getLedgerFromApi(token, { company_id, del_flg }) {
    const params = new URLSearchParams();
    params.append('company_id', company_id)
    try {
        return yield API().get(`/ledgers/${del_flg}`, { params, headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}

export function* CreateLedger(token, data) {
    try {
        return yield API().post(`/ledgers`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}


export function* ChangeLedger(token, data) {
    try {
        return yield API().patch(`/ledgers/${data.id}`, { ...data }, { headers: { Authorization: "Bearer " + token } })
    } catch (error) {
        return yield error.response
    }
}
