import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import RiskSummary from "./Summary"

const Reports = ({ match }) => {
    return (
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/all`} />
            <Route path={`${match.url}/summary`} component={RiskSummary} />
           
        </Switch>

    );
};

export default Reports;