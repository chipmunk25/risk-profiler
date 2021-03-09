import React, { useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';
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
import _ from "lodash"
import { requestGetRole } from "appRedux/Actions/auth"
import {
    NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
    THEME_TYPE_LITE
} from "appRedux/Actions/ThemeSetting";

const MenuItemGroup = Menu.ItemGroup;

const SubMenu = Menu.SubMenu;
const convertToUpper = str => {
    try {
        return str.toUpperCase()
    } catch (error) {
        return ""
    }
}
const FindRolePermissions = (arrayList, role_id) => {
    return arrayList && arrayList.find(item => parseInt(item.id) === parseInt(role_id))
}
const FilterMenuByType = (arrayList, parent) => {
    const result = arrayList && arrayList.filter(item => item.permission_m.perm_type === "ROUTE" && convertToUpper(item.permission_m.perm_parent) === convertToUpper(parent))
    return result
}
const SidebarContent = () => {
    const dispatch = useDispatch()
    let { pathname } = useSelector(({ common }) => common);
    let { navStyle, themeType } = useSelector(({ settings }) => settings);

    const { user, roleLists, role_id } = useSelector(({ auth }) => auth);

    useEffect(() => {
        dispatch(requestGetRole({ company_id: user.company_id, del_flg: 0 }))
    }, [])



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
                            {_.sortBy(FilterMenuByType(FindRolePermissions(roleLists, role_id) ? FindRolePermissions(roleLists, role_id).role_permission_ms : [], "MAIN"), ["permission_m.permission"]).map(item => (
                                <Menu.Item key={item.permission_id}>
                                    <Link to={item.permission_m.description}>
                                        <i className={`icon icon-${item.permission_m.perm_icon}`} />
                                        <span>{item.permission_m.permission}</span></Link>
                                </Menu.Item>
                            ))}
                        </MenuItemGroup>
                        <MenuItemGroup key="config" className="gx-menu-group" title={"Config"}>
                            {_.sortBy(FilterMenuByType(FindRolePermissions(roleLists, role_id) ? FindRolePermissions(roleLists, role_id).role_permission_ms : [], "CONFIG"), ["permission_m.permission"]).map(item => (
                                <Menu.Item key={item.permission_id}>
                                    <Link to={item.permission_m.description}>
                                        <i className={`icon icon-${item.permission_m.perm_icon}`} />
                                        <span>{item.permission_m.permission}</span></Link>
                                </Menu.Item>
                            ))}
                        </MenuItemGroup>
                        <MenuItemGroup key="reports" className="gx-menu-group" title={"Reports"}>
                            {_.sortBy(FilterMenuByType(FindRolePermissions(roleLists, role_id) ? FindRolePermissions(roleLists, role_id).role_permission_ms : [], "REPORTS"), ["permission_m.permission"]).map(item => (
                                <Menu.Item key={item.permission_id}>
                                    <Link to={item.permission_m.description}>
                                        <i className={`icon icon-${item.permission_m.perm_icon}`} />
                                        <span>{item.permission_m.permission}</span></Link>
                                </Menu.Item>
                            ))}
                        </MenuItemGroup>
                        <MenuItemGroup key="setups" className="gx-menu-group" title={"Setups"}>
                            {_.sortBy(FilterMenuByType(FindRolePermissions(roleLists, role_id) ? FindRolePermissions(roleLists, role_id).role_permission_ms : [], "SETUPS"), ["permission_m.permission"]).map(item => (
                                <Menu.Item key={item.permission_id}>
                                    <Link to={item.permission_m.description}>
                                        <i className={`icon icon-${item.permission_m.perm_icon}`} />
                                        <span>{item.permission_m.permission}</span></Link>
                                </Menu.Item>
                            ))}
                        </MenuItemGroup>
                    </Menu>
                </CustomScrollbars>
            </div>
        </>
    );
};

SidebarContent.propTypes = {};

export default SidebarContent;

