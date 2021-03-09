import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import Auth from "./Auth";
import Common from "./common";
import statuses from "./status";
import people from "./people";
import indicators from "./indicator";
import settings from "./Settings";
const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: Auth,
    common: Common,
    statuses, people,
    settings,indicators

}); 

export default createRootReducer
