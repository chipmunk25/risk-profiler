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
import { requestGetAvailableStock, } from "appRedux/Actions/stocks"
import { requestGetSales, requestGetBillDue, requestGetTopCustomer, requestGetMonthSales } from "appRedux/Actions/sales"

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

    const { availableLists } = useSelector(({ stocks }) => stocks);
    const { salesLists, billsDueLists, topCustomerLists, monthSalesLists } = useSelector(({ sales }) => sales);
    const { user, } = useSelector(({ auth }) => auth)
    const { loader } = useSelector(({ common }) => common);
    const [dataSource, setDataSource] = useState([])
    useEffect(() => { dispatch(requestGetAvailableStock({ company_id: user.company_id, branch_id: user.branch_id })) }, [ ])
    useEffect(() => {
        const LoadData = async () => {
            setDataSource(await availableLists.filter(item => item.quantity <= item.product_m.low_stock_level))
        }
        LoadData()
    }, [availableLists]) 
    useEffect(() => {

        dispatch(requestGetSales({
            sale_date: moment().format("YYYY-MM-DD"),
            created_user: 0,
            branch_id: user.branch_id,
            company_id: user.company_id,
            trans_type: "DAILY"
        }))
    }, [ ])
    useEffect(() => {
        dispatch(requestGetMonthSales({
            sale_date: moment().format("YYYY-MM-DD"),
            created_user: 0,
            branch_id: user.branch_id,
            company_id: user.company_id,
            trans_type: "MONTHLY"
        }))
        dispatch(showAuthLoader())
    }, [ ])
    useEffect(() => {
        dispatch(requestGetBillDue({
            branch_id: user.branch_id,
            company_id: user.company_id,
        }))
    }, [ ])
    useEffect(() => {
        dispatch(requestGetTopCustomer({
            branch_id: user.branch_id,
            company_id: user.company_id,
        }))
    }, [ ])

    return (
        <div>
            <LoadingProgress loading={loader} />
            <Row justify="start">
                <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                    <EcommerceStatus color="geekblue" icon="revenue-new" title={salesLists ?
                        formatCurrency(salesLists.reduce((a, c) => (a + (parseFloat(c.total_amt))), 0))
                        : 0} colorTitle="primary"
                        subTitle="Total Revenue Today" colorSubTitle="grey" />
                </Col>
                <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                    <EcommerceStatus color="orange" icon="orders" title={
                        salesLists ? formatCurrency(salesLists.reduce((a, c) => (a + (parseFloat(c.discount_amt))), 0)) : 0
                    } colorTitle="geekblue"
                        subTitle="Total Discount Today" colorSubTitle="geekblue" />
                </Col>

                <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                    <EcommerceStatus color={DashColor[2].cardColor} icon="visits" title={
                        salesLists ? formatCurrency(billsDueLists.reduce((a, c) => (a + (parseFloat(actualDebt(c.debt_amt, c.amt_paid)))), 0)) : 0
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
                        dataSource={dataSource && dataSource.slice(0, 10).map((item, index) => {
                            return {
                                ...item,
                                rowNumber: index + 1,
                                category: item.product_m.category_m.product_category,
                                product: item.product_m.product_description,
                                unit: item.unit_m.name,
                                reorder_level: item.product_m.low_stock_level,
                            }
                        })}
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
                        dataSource={orderBy(monthSalesLists.slice(0, 10), ['grand_total'], ['desc']).map((item, index) => {
                            return {
                                ...item,
                                rowNumber: index + 1,
                                quantity: item.grand_qty,
                                product: item['product_m.product_description'],
                                unit: item['unit_m.name'],
                                sell_price: `₵ ${item.selling_price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                                total_amt: `₵ ${item.grand_total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                                total_amount: item.grand_total,
                            }
                        })}
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
                        dataSource={orderBy(topCustomerLists.slice(0, 10), ['total_amt'], ['desc']).map((item, index) => {
                            return {
                                ...item,
                                rowNumber: index + 1,
                                customer: item.customer_m.customer,
                                total_sales: `₵ ${item.total_amt}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                                total_qty: `₵ ${item.grand_qty}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                                total_discount: `₵ ${item.discount_amt}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                            }
                        })}
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
                        dataSource={orderBy(billsDueLists.slice(0, 10), ['oustanding_debt'], ['desc']).map((item, index) => {
                            return {
                                ...item,
                                rowNumber: index + 1,
                                customer: item.customer_m.customer,
                                debt: `₵ ${item.oustanding_debt}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                            }
                        })}
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

const formatCurrency = (amount) => `₵ ${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const actualDebt = (debt, paid) => debt - paid
export default DashboardTop;