import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import IndicatorType from "./IndicatorType"
import IndicatorDescription from "./IndicatorDescription"
import Indicator from "./Indicator"

const Indicators = ({ match }) => {
    return (

        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/customers`} />
            <Route path={`${match.url}/type`} component={IndicatorType} />
            <Route path={`${match.url}/description`} component={IndicatorDescription} />
            <Route path={`${match.url}/indicator`} component={Indicator} />
        </Switch>

    );
};

export default Indicators;