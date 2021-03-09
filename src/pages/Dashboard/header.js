import React, { useEffect, useState, } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Row, Col } from "antd"
//import DashboardCard from "./card"
import DashColor from "utils/DashColor";
import DashboardTops from './dashboardtops';
import BalanceHistory from "./BalanceHistory"
import EcommerceStatus from "./EcommerceStatus"

import LoadingProgress from "components/Loading"
//import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

import { showAuthLoader, } from "appRedux/Actions/common"
import moment from "moment"
//import ChartCard from './ChartCard';
import { orderBy } from "lodash"
export const lineData = [
    { name: 'Page A', price: 200 },
    { name: 'Page B', price: 1100 },
    { name: 'Page C', price: 800 },
    { name: 'Page D', price: 1700 },
    { name: 'Page D', price: 600 },
    { name: 'Page D', price: 1800 },
    { name: 'Page D', price: 600 },
];

const DashboardTop = () => {

    const dispatch = useDispatch()

    const { user, } = useSelector(({ auth }) => auth)
    const { loader } = useSelector(({ common }) => common);
    const [dataSource, setDataSource] = useState([])
    
    return (
        <div>
            <LoadingProgress loading={loader} />
            <Row justify="start">
                <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                    <EcommerceStatus color="geekblue" icon="revenue-new" title={ 0} colorTitle="primary"
                        subTitle="Total Revenue Today" colorSubTitle="grey" />
                </Col>
                <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                    <EcommerceStatus color="orange" icon="orders" title={
                        0
                    } colorTitle="geekblue"
                        subTitle="Total Discount Today" colorSubTitle="geekblue" />
                </Col>

                <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                    <EcommerceStatus color={DashColor[2].cardColor} icon="visits" title={ 0
                    } colorTitle="white" subTitle="Total Outstanding Debt"
                        colorSubTitle="geekblue" />
                </Col>
                <Col xl={12} lg={16} md={24} sm={16} xs={24}>
                    <BalanceHistory
                    />
                </Col>

                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <DashboardTops
                        viewAll="stock/reorder"
                        cartTitle="Products Need Reorder"
                        size="small"
                        dataSource={dataSource }
                        rowKey="product_id"
                        scroll={{
                            y: 170,
                        }}
                        columns={[
                            {
                                title: '#',
                                dataIndex: 'rowNumber',
                                key: 'rowNumber',
                                width: 30,
                            }, {
                                title: 'Product',
                                dataIndex: 'product',
                                key: 'product',
                            }, {
                                title: 'Unit',
                                dataIndex: 'unit',
                                key: 'unit',
                                width: 80,
                            }, {
                                title: 'Qty',
                                dataIndex: 'quantity',
                                key: 'quantity',
                                width: 60,
                            }, {
                                title: 'Reorder',
                                dataIndex: 'reorder_level',
                                key: 'reorder_level',
                                width: 65,
                            },
                        ]}
                    />
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    <DashboardTops
                        viewAll="records/topselling"
                        cartTitle="Top Selling Products"
                        size="small"
                        dataSource={[]}
                        rowKey="product_id"
                        scroll={{
                            y: 170,
                        }}
                        columns={[
                            {
                                title: '#',
                                dataIndex: 'rowNumber',
                                key: 'rowNumber',
                                width: 30,
                            }, {
                                title: 'Product',
                                dataIndex: 'product',
                                key: 'product',
                            }, {
                                title: 'Unit',
                                dataIndex: 'unit',
                                key: 'unit',
                                width: 100,
                            }, {
                                title: 'Qty',
                                dataIndex: 'quantity',
                                key: 'quantity',
                                width: 70,
                            }, {
                                title: 'Sales',
                                dataIndex: 'total_amt',
                                key: 'total_amt',
                                width: 70,
                            },
                        ]}
                    />
                </Col>

                <Col xl={12} lg={12} md={12} sm={16} xs={24}>
                    <DashboardTops
                        viewAll="records/topcustomers"
                        cartTitle="Top Customer List"
                        size="small"
                        dataSource={[]}
                        rowKey="customer_id"
                        scroll={{
                            y: 170,
                        }}
                        columns={[
                            {
                                title: '#',
                                dataIndex: 'rowNumber',
                                key: 'rowNumber',
                                width: 30,
                            }, {
                                title: 'Customer',
                                dataIndex: 'customer',
                                key: 'customer',
                            }, {
                                title: 'Total Sales',
                                dataIndex: 'total_sales',
                                key: 'total_sales',
                            }, {
                                title: 'Items Sold Qty',
                                dataIndex: 'grand_qty',
                                key: 'grand_qty',
                            }, {
                                title: 'Discount Received',
                                dataIndex: 'total_discount',
                                key: 'total_discount',
                            },
                        ]}
                    />
                </Col>
                <Col xl={8} lg={8} md={12} sm={16} xs={24}>
                    <DashboardTops
                        viewAll="records/allbillsdue"
                        cartTitle="All Bills Due"
                        size="small"
                        dataSource={[]}
                        rowKey="customer_id"
                        scroll={{
                            y: 170,
                        }}
                        columns={[
                            {
                                title: '#',
                                dataIndex: 'rowNumber',
                                key: 'rowNumber',
                                width: 30,
                            }, {
                                title: 'Customer',
                                dataIndex: 'customer',
                                key: 'customer',
                            }, {
                                title: 'Outstanding Debt',
                                dataIndex: 'debt',
                                key: 'debt',
                            },
                        ]}
                    />
                </Col>



            </Row>
        </div>
    );
};

export default DashboardTop;