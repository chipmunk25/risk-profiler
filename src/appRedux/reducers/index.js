import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import Auth from "./Auth";
import Common from "./common";
import products from "./products";
import people from "./people";
import stocks from "./stocks";
import sales from "./sales";
import ledgers from "./ledgers";
import indicators from "./indicator";
import settings from "./Settings";
const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: Auth,
    common: Common,
   products, people,
    settings, stocks, sales, ledgers,indicators

}); 

export default createRootReducer
