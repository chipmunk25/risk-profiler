let index, newlist
export const onAddItem = (state, payload) => {
    return {
        ...state, profiler: [...state.profiler, { ...payload, indicator_description_map_id: payload.id }]
    }
}
export const onAddItems = (state, payload) => {
    return {
        ...state,
        profiler: [...state.profiler, ...payload]
    }
}

export const onItemExist = (state, payload) => {
    return state.profiler.find(item => parseInt(payload.indicator_id) === parseInt(item.indicator_id)
        //  && parseInt(payload.description_id) === parseInt(item.description_id)
    )
}


export const onUpdateItem = (state, payload) => {
    index = state.profiler.indexOf(onItemExist(state, payload))
    newlist = [...state.profiler];
    const newpayload = {
        ...payload,
         indicator_description_map_id: payload.id 
    }
    if (index > -1) {
        newlist[index] = newpayload
    }
    return { ...state, profiler: newlist }
}

export const onRemoveItem = (state, payload) => {
    return {
        ...state,
        profiler: state.profiler.filter((item) => item.product_id !== payload.product_id),
    };
}
export const onRemoveAll = (state) => {
    return {
        ...state,
        profiler: [],
    };
}