import React from 'react';

import { Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "./Dashboard"
import Customers from "./Customer"
import Indicators from "./Indicators"


const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`} />
      <Route path={`${match.url}dashboard`} component={Dashboard} />
      <Route path={`${match.url}customers`} component={Customers} /> 
      <Route path={`${match.url}indicators`} component={Indicators} /> 
    </Switch>
  </div>
);


export default App;