import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Popover } from "antd";
import { signOutUser } from "appRedux/Actions/auth";
import { Link } from "react-router-dom";
import profile from "images/profile.jpg"
const UserProfile = () => {
  const { user } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>  <Link to="/setups/profile"> Edit Profile</Link> </li>
      <li>  <Link to="/setups/chgpwd"> Change Password</Link> </li>

      {/*  <li>Connections</li> */}
      <li onClick={() => dispatch(signOutUser())}>Logout
      </li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
      <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
        <Avatar src={user.profile ? user.profile : profile}
          className="gx-size-40 gx-pointer gx-mr-3" alt={user.fullname} />
        <span className="gx-avatar-name"> {user.fullname} <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" /></span>
      </Popover>
    </div>
  )
};

export default UserProfile;
