import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
    DashboardOutlined, UserOutlined, DiffOutlined, DeploymentUnitOutlined,
    AuditOutlined, ApartmentOutlined, AppstoreAddOutlined, ContainerOutlined, BankOutlined, ShopOutlined,
    ReconciliationOutlined, TrademarkOutlined, UsergroupAddOutlined,
    SettingOutlined, LineChartOutlined, SwapOutlined, UngroupOutlined, SplitCellsOutlined, ScheduleOutlined,
    ClockCircleOutlined, WeiboSquareOutlined, GoldOutlined, BookOutlined,
    DotChartOutlined, PoundOutlined, AccountBookOutlined, BarChartOutlined, RiseOutlined, FundOutlined, FallOutlined,
} from '@ant-design/icons';

import CustomScrollbars from "utils/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";

import AppsNavigation from "./AppsNavigation";
//import AppNotification from "components/AppNotification";
//import MailNotification from "components/MailNotification";

import {
    NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
    THEME_TYPE_LITE
} from "appRedux/Actions/ThemeSetting";
import { useSelector } from "react-redux";

const MenuItemGroup = Menu.ItemGroup;

const SubMenu = Menu.SubMenu;
const SidebarContent = () => {

    let { pathname } = useSelector(({ common }) => common);
    let { navStyle, themeType } = useSelector(({ settings }) => settings);



    const getNoHeaderClass = (navStyle) => {
        if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
            return "gx-no-header-notifications";
        }
        return "";
    };

    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    /* const getNavStyleSubMenuClass = (navStyle) => {
        if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
            return "gx-no-header-submenu-popup";
        }
        return "";
    }; */
    return (
        <>
            <SidebarLogo />
            <div className="gx-sidebar-content">
                <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
                    <UserProfile />
                    <AppsNavigation />
                </div>
                <CustomScrollbars className="gx-layout-sider-scrollbar">
                    <Menu
                        defaultOpenKeys={[defaultOpenKeys]}
                        selectedKeys={[selectedKeys]}
                        theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
                        mode="inline">

                        <MenuItemGroup key="main" className="gx-menu-group" title={"Main"}>
                            <Menu.Item key="1">
                                <Link to="/dashboard">
                                    <DashboardOutlined className="sidenav-icon" />
                                    <span>Dashboard</span></Link>
                            </Menu.Item>
                       <Menu.Item key="21">
                                <Link to="/dashboard">
                                    <DashboardOutlined className="sidenav-icon" />
                                    <span>Customer Profiler</span></Link>
                            </Menu.Item>
                        </MenuItemGroup>
                         <MenuItemGroup key="main" className="gx-menu-group" title={"Config"}>
                            <Menu.Item key="11">
                                <Link to="/indicators/type">
                                    <DashboardOutlined className="sidenav-icon" />
                                    <span>Indicator Type</span></Link>
                            </Menu.Item>
                              <Menu.Item key="12">
                                <Link to="/indicators/indicator">
                                    <DashboardOutlined className="sidenav-icon" />
                                    <span>Indicator</span></Link>
                            </Menu.Item>
                            <Menu.Item key="13">
                                <Link to="/indicators/description">
                                    <DashboardOutlined className="sidenav-icon" />
                                    <span>Description</span></Link>
                            </Menu.Item>
                            <Menu.Item key="14">
                                <Link to="/indicators/mapping">
                                    <DashboardOutlined className="sidenav-icon" />
                                    <span>Mapping</span></Link>
                            </Menu.Item>
                           <Menu.Item key="15">
                                <Link to="/customers">
                                    <DashboardOutlined className="sidenav-icon" />
                                    <span>Customer</span></Link>
                            </Menu.Item>
                           
                        </MenuItemGroup>
                        
                        <MenuItemGroup key="users" className="gx-menu-group" title={"Setups"}>
                            <Menu.Item key="154">
                                <Link to="/setups/branch">
                                    <i className="icon icon-company" />
                                    <span>Branch</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="155">
                                <Link to="/setups/users">
                                    <i className="icon icon-family" />
                                    <span>Users</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="15">
                                <Link to="/setups/profile">
                                    <i className="icon icon-profile" />
                                    <span>User Profile</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="16">
                                <Link to="/setups/chgpwd">
                                    <SettingOutlined />
                                    <span>Change Password</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="164">
                                <Link to="/setups/resetpwd">
                                    <i className="icon icon-reset-password" />
                                    <span>Reset Password</span>
                                </Link>
                            </Menu.Item>
                        </MenuItemGroup>
                    </Menu>
                </CustomScrollbars>
            </div>
        </>
    );
};

SidebarContent.propTypes = {};

export default SidebarContent;

