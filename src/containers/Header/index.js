import React, { useEffect } from "react";
import { Layout, Popover } from "antd";
import { Link } from "react-router-dom";

import UserInfo from "components/UserInfo";

import AppNotification from "components/AppNotification";
import MailNotification from "components/MailNotification";
import Auxiliary from "utils/Auxiliary";
import { MenuFoldOutlined } from "@ant-design/icons"
import { toggleCollapsedSideNav } from "appRedux/Actions/Setting";
import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE } from "appRedux/Actions/ThemeSetting";
import { useDispatch, useSelector } from "react-redux";
import wlogo from "images/logo.png"
import CompanyDetails from "./CompanyDetails"
const { Header } = Layout;

const PageHeader = () => {

  const dispatch = useDispatch();

  const { width, navStyle } = useSelector(({ settings }) => settings);
  const { navCollapsed } = useSelector(({ common }) => common);


  return (
    <Header className="cs-header">
      {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ?
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="gx-linebar gx-mr-3 gx-ml-5">
            <MenuFoldOutlined
              style={{ fontSize: 30 }}
              onClick={() => {
                dispatch(toggleCollapsedSideNav(!navCollapsed));
              }}
            />
          </div>
          <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer">
            <img alt="" src={wlogo} /></Link>
        </div>
        : null}
      <div>
        <CompanyDetails />
      </div>

      <ul className="gx-header-notifications gx-ml-auto">
        {/* <Auxiliary>
          <li className="gx-notify">
            <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<AppNotification />}
              trigger="click">
              <span className="gx-pointer gx-status-pos gx-d-block">
                <i className="icon icon-notification" />
                <span className="gx-status gx-status-rtl gx-small gx-red" />
              </span>
            </Popover>
          </li>

          <li className="gx-msg">
            <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
              content={<MailNotification />} trigger="click">
              <span className="gx-pointer gx-status-pos gx-d-block">
                <i className="icon icon-chat-new" />
                <span className="gx-status gx-status-rtl gx-small gx-orange" />
              </span>
            </Popover>
          </li>
        </Auxiliary> */}
        {/*  {width >= TAB_SIZE ? null : } */}

        {width >= TAB_SIZE ?
          <Auxiliary>
            <li className="gx-user-nav"><UserInfo /></li>
          </Auxiliary>
          :
          <Auxiliary>
            <li className="gx-user-nav"><UserInfo width={true} /></li>
          </Auxiliary>
        }
      </ul>

    </Header>
  );
};

export default PageHeader;
