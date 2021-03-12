import React, { useEffect } from "react";
import LoginForm from "./loginform"
import loginImg from "../../images/login.svg";
import logom from "../../images/logo-b.png"
import "./login.scss"

import {  useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const Login = (props) => {
    const { authUser } = useSelector(({ auth }) => auth);
  const history = useHistory();
  
    useEffect(() => {
        if (authUser !== null) {
          history.push('/');
        }
      });
    return (
        <div className="base-container" ref={props.containerRef} >
            <div className="header">
              <img src={logom} alt="logo" />
            {/*   <h3>HyperBuild</h3> */}
            </div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} alt="login" />
                </div>
                <LoginForm />
            </div>

        </div>
    );
};

export default Login;