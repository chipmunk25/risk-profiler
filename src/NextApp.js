
import React from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from "react-router-dom";

import configureStore from './appRedux/store';
import { history } from "./appRedux/history"
import App from "./containers/App/index";

import 'antd/dist/antd.css';
import "./styles/main.scss"
import "./styles/util.css"
import "styles/vendors/style";
const store = configureStore(/* provide initial state if any */);

const NextApp = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>


export default (NextApp);
