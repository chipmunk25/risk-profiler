import React, { useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from "antd";

import Auxiliary from "utils/Auxiliary";
import DashboardCards from "./card";
import { Link } from "react-router-dom";
import _ from "lodash"
import { requestGetRole } from "appRedux/Actions/auth"
const dashColor = [
    { colorTitle: "white", cardColor: "geekblue", colorSubTitle: "grey", icon: "widgets" },
    { colorTitle: "white", cardColor: "orange", colorSubTitle: "grey", icon: "product-list" },
    { colorTitle: "white", cardColor: "red", colorSubTitle: "geekblue", icon: "list-select-o" },
    { colorTitle: "white", cardColor: "green", colorSubTitle: "geekblue", icon: "apps" },
    { colorTitle: "white", cardColor: "purple", colorSubTitle: "geekblue", icon: "auth-screen" },
    { colorTitle: "white", cardColor: "blue", colorSubTitle: "grey", icon: "all-contacts" },
    { colorTitle: "geekblue", cardColor: "amber", colorSubTitle: "grey", icon: "copy" },
    { colorTitle: "white", cardColor: "red", colorSubTitle: "geekblue", icon: "feedback" },
    { colorTitle: "white", cardColor: "red", colorSubTitle: "geekblue", icon: "icon" },
    { colorTitle: "white", cardColor: "red", colorSubTitle: "geekblue", icon: "notification-new" },
    { colorTitle: "white", cardColor: "red", colorSubTitle: "geekblue", icon: "table-general" },
    { colorTitle: "white", cardColor: "red", colorSubTitle: "geekblue", icon: "tasks" },
]

const FindRolePermissions = (arrayList, role_id) => {
    return arrayList && arrayList.find(item => parseInt(item.id) === parseInt(role_id))
}
const FilterMenuByType = (arrayList) => {
    const result = arrayList && arrayList.filter(item => item.permission_m.perm_type === "ROUTE")
    return result
}
const Dashboard = () => {
    const dispatch = useDispatch()
    const { user, roleLists, role_id } = useSelector(({ auth }) => auth);
    useEffect(() => {
        dispatch(requestGetRole({ company_id: user.company_id, del_flg: 0 }))
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
            <Auxiliary>
                <Row>
                    {
                        _.sortBy(FilterMenuByType(FindRolePermissions(roleLists, role_id) ? FindRolePermissions(roleLists, role_id).role_permission_ms : []), ["permission_m.permission"]).map((item, index) => (
                            <Col key={item.permission_id} xl={6} lg={12} md={12} sm={12} xs={24}>
                                <Link to={item.permission_m.description}>
                                    <DashboardCards
                                        color={dashColor[index % 7].cardColor} icon={item.permission_m.perm_icon}
                                        title={item.permission_m.permission} colorTitle={dashColor[index % 7].colorTitle}
                                        subTitle="" colorSubTitle={dashColor[index % 7].colorSubTitle} //item
                                    />
                                </Link>
                            </Col>
                        ))
                    }

                </Row>

            </Auxiliary>
        </div>
    );
};

export default Dashboard;