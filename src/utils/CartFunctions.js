let index, newlist
export const onAddItem = (state, payload) => {
    // // console.log(state, payload)
    return {
        ...state, cartList: [...state.cartList, { ...payload }]
    }
}
export const onAddItems = (state, payload) => {
    // console.log(state.cartList, payload)
    return {
        ...state,
        cartList: [...state.cartList, ...payload]
    }
}

export const onItemExist = (state, payload) => {
    return state.cartList.find(item => parseInt(payload.product_id) === parseInt(item.product_id)
    )
}


export const onUpdateItem = (state, payload) => {
    index = state.cartList.indexOf(onItemExist(state, payload))
    newlist = [...state.cartList];
    if (index > -1) {
        /*   newlist[index].product_id = payload.product_id;
          newlist[index].unit_id = payload.unit_id;
          newlist[index].quantity = payload.quantity;
          newlist[index].cost_price = payload.cost_price;
          newlist[index].customer_price = payload.customer_price;
          newlist[index].selling_price = payload.selling_price;
          newlist[index].total_cost = payload.cost_price * payload.quantity;
          newlist[index].total_amount = payload.selling_price * payload.quantity;
          newlist[index].customer_amount = payload.customer_price * payload.quantity; */
        newlist[index] = payload
    }
    return { ...state, cartList: newlist }
}

export const onRemoveItem = (state, payload) => {
    return {
        ...state,
        cartList: state.cartList.filter((item) => item.product_id !== payload.product_id),
    };
}
export const onRemoveAll = (state) => {
    return {
        ...state,
        cartList: [],
    };
}