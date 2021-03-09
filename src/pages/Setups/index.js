import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Branch from "./Branch"
import Users from "./Users"
import ResetPassword from "./ResetPassword"
import ChangePassword from "./ChangePassword"
import UserProfile from "./UserProfile"

import Permissions from "./Permissions"
import Roles from "./Roles"
const Setups = ({ match }) => {
    return (
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/all`} />
            <Route path={`${match.url}/branch`} component={Branch} />
            <Route path={`${match.url}/users`} component={Users} />
            <Route path={`${match.url}/roles`} component={Roles} />
            <Route path={`${match.url}/permissions`} component={Permissions} />
            <Route path={`${match.url}/resetpwd`} component={ResetPassword} />
            <Route path={`${match.url}/chgpwd`} component={ChangePassword} />
            <Route path={`${match.url}/profile`} component={UserProfile} />
        </Switch>

    );
}; 

export default Setups;