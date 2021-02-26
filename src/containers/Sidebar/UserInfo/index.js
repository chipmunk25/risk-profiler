import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Popover } from "antd";
import { signOutUser } from "appRedux/Actions/auth";
import { useHistory, Link } from 'react-router-dom';
import _ from "lodash";
import Auxiliary from "utils/Auxiliary";
import {
    LogoutOutlined
} from '@ant-design/icons';
const UserInfo = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(({ auth }) => auth);
    const history = useHistory();
    const handleLogout = () => {
        dispatch(signOutUser())
      //  history.replace({ pathname: '/login', })
    }
    const userMenuOptions = (

        <Auxiliary>
            <div className="gx-popover-header">
                {
                    _.isNull(user.profile) ?
                        <Avatar size="large" style={{ zIndex: 5, backgroundColor: '#A9CF3E', fontSize: '25px', color: '#fff', verticalAlign: 'middle' }} className="gx-avatar gx-pointer">
                            {user.fullname.charAt(0).toUpperCase()}
                        </Avatar>
                        : <Avatar src={user.profile}
                            className="gx-size-40 gx-pointer gx-mr-3" alt={user.fullname} />
                }
                <h3 className="gx-mb-0">{user.fullname}</h3>
            </div>
            <div className="gx-popover-header gx-mt-10" >
                <small style={{ marginTop: 10 }} className="gx-fs-sm gx-justify-content-center gx-text-grey">{user.email}</small>
            </div>
            <ul className="gx-user-popover">
                <li className="gx-media gx-pointer" style={{ marginTop: 10 }}>
                    <i className={`icon icon-profile2`} style={{ fontSize: '25px' }} />
                    <Link to={`/setups/profile`}> <span className="gx-language-text" style={{ marginLeft: 5, fontSize: '17px', color: 'black' }}>Profile</span></Link>
                </li>
                <li className="gx-media gx-pointer" style={{ marginTop: 10 }}>
                    <i className={`icon icon-reset-password`} style={{ fontSize: '25px' }} />
                    <Link to={`/setups/chgpwd`}> <span className="gx-language-text" style={{ marginLeft: 2, fontSize: '17px', color: 'black' }}>Password</span></Link>
                </li>
                <li className="gx-media gx-pointer" style={{ marginTop: 10 }} onClick={handleLogout}>
                    <LogoutOutlined style={{ fontSize: '25px' }} />
                    <span className="gx-language-text" style={{ marginLeft: 5, fontSize: '17px' }}>Logout</span></li>
            </ul>

        </Auxiliary>

    );

    return (
        <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
            trigger="click">
            <Avatar size="large"
                style={{ zIndex: 5, backgroundColor: '#A9CF3E', fontSize: '25px', color: '#fff', verticalAlign: 'middle' }}
                className="gx-avatar gx-pointer">
                {user.fullname.charAt(0).toUpperCase()}
            </Avatar>
        </Popover>
    )

}

export default UserInfo;
