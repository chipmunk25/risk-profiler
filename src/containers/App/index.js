import React, { memo, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import MainApp from "./MainApp";
import { Redirect, Route, Switch, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import SignIn from '../SignIn';


import { setInitUrl } from "appRedux/Actions/auth";
const RestrictedRoute = ({ component: Component, location, authUser, ...rest }) =>
    <Route
        {...rest}
        render={props =>
            authUser
                ? <Component {...props} />
                : <Redirect
                    to={{ pathname: '/signin', state: { from: location } }}
                />}
    />;



const App = () => {
    const { authUser, initURL } = useSelector(({ auth }) => auth);

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();

    useEffect(() => {
        if (initURL === '') {
            dispatch(setInitUrl(location.pathname));
        }
    });

    useEffect(() => {
        if (location.pathname === '/') {
            if (authUser === null) {
                history.push('/signin');
            } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
                history.push('/dashboard');
            } else {
                history.push(initURL);
            }
        }
    }, [authUser, initURL, location, history]);

    return (
        <div>
            <Switch>
                <Route exact path='/signin' component={SignIn} />
                <RestrictedRoute path={`${match.url}`} authUser={authUser} location={location}
                    component={MainApp} />
            </Switch>
        </div>
    );
};

export default memo(App);