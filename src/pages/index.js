import React from 'react';

import { Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "./Dashboard"
import Customers from "./Customer"
import Indicators from "./Indicators"
import CustomerProfiler from "./Profiler"

import Setups from "./Setups"
import Statuses from './Statuses';
import Reports from './Reports';
import CustomerReview from './CustomerReview';
import CustomerRiskReview from './RiskReview';

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`} />
      <Route path={`${match.url}dashboard`} component={Dashboard} />
      <Route path={`${match.url}customers`} component={Customers} />
      <Route path={`${match.url}status`} component={Statuses} />
      <Route path={`${match.url}indicators`} component={Indicators} />
      <Route path={`${match.url}profiler`} component={CustomerProfiler} />
      <Route path={`${match.url}reports`} component={Reports} />
      <Route path={`${match.url}setups`} component={Setups} />
      <Route path={`${match.url}customerreview`} component={CustomerReview} />
      <Route path={`${match.url}riskreview`} component={CustomerRiskReview} />
    </Switch>
  </div>
);


export default App;