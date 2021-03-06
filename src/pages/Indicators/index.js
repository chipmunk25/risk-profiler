import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import IndicatorType from "./IndicatorType"
import IndicatorDescription from "./IndicatorDescription"
import Indicator from "./Indicator"
import IndicatorMapping from "./Mapping"
import Review from "./Review"
  
const Indicators = ({ match }) => {
    return (
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/type`} />
            <Route path={`${match.url}/type`} component={IndicatorType} />
            <Route path={`${match.url}/description`} component={IndicatorDescription} />
            <Route path={`${match.url}/indicator`} component={Indicator} />
            <Route path={`${match.url}/mapping`} component={IndicatorMapping} />
            <Route path={`${match.url}/review`} component={Review} />
        </Switch>
    );
};

export default Indicators;