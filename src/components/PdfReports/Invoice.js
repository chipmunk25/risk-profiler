import React, { Component } from 'react';
import { Empty, Row, Col } from 'antd';
import ReportHeader from "./ReportHeader"
import _ from 'lodash';
import moment from 'moment';
//const { Text } = Typography;

export default class DailyReportPrint extends Component {

    render() {
        const { details, useCustomerPrice, noFormat } = this.props

        return (

            <div> {!_.isEmpty(details) ? <div id="invoice">

                <div className="  overflow-auto">
                    <div style={{ minWidth: "600px" }}>
                        <ReportHeader />
                        <main className="table100 ver1 m-b-110">
                            <Row justify="space-between" className="m-b-20">
                                <Col className="p-l-30">
                                    <h1 className="invoice-id">INVOICE #: {details.sale_code}</h1>
                                    <div className="date">Date of Invoice: {moment().format('DD/MM/YYYY')}</div>
                                </Col>
                                <Col className="p-r-30">
                                    <div className="text-gray-light">Customer Info </div>
                                    <h2 className="to">{details.customer.customer}</h2>
                                    <div className="address">{details.customer.telephone}</div>

                                </Col>
                            </Row>

                            <table data-vertable="ver1" className="table">
                                <thead>
                                    <tr className="row100 head">
                                        <th className="column100 column1">#</th>
                                        <th className="column100 column1">Product</th>
                                        <th className="column100 column1">Unit</th>
                                        <th className="column100 column1 text-right">Price</th>
                                        <th className="column100 column1 text-right">Qty</th>
                                        <th className="column100 column1 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        details && details.cartList.map(({ description, unit, customer_price, selling_price, quantity, total_amount, customer_amount }, index) => {
                                            return (<React.Fragment key={index}>
                                                <tr key={index} className="row100">
                                                    <td className="column10 column1 border-right ">{index + 1}</td>
                                                    <td className="column300 column1 border-right ">{description}</td>
                                                    <td className="column100 column1 border-right">{unit}</td>
                                                    <td className="column20 column1 border-right text-right">{useCustomerPrice ? customer_price : selling_price}</td>
                                                    <td className="column20 column1  border-right text-right">{quantity}</td>
                                                    <td className="column20 column1  border-right text-right">{useCustomerPrice ? customer_amount : total_amount}</td>
                                                </tr>
                                            </React.Fragment>
                                            )
                                        })
                                    }
                                </tbody>
                                <tfoot >
                                    <tr>
                                        <td className="text-left" colSpan={4}>Total: </td>
                                        <td className="gx-text-center border-right">
                                        </td>
                                        <td className="gx-text-center ">
                                            {noFormat ? details.total_amount : formatCurrency(details.total_amount)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left" colSpan={4}>Discount: </td>
                                        <td className="gx-text-right  " colSpan={2}>
                                            <span className="p-r-30"> {noFormat ? details.discount_amount : formatCurrency(details.discount_amount)} </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left" colSpan={4}>Grand Total: </td>
                                        <td className="gx-text-right  " colSpan={2}>
                                            <span className="p-r-30"> {formatCurrency(details.grand_total)} </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-left" colSpan={4}>Cash Paid: </td>
                                        <td className="gx-text-right" colSpan={2}>
                                            <span className="p-r-30">  {noFormat ? details.total_paid : formatCurrency(details.total_paid)}</span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </main>
                    </div>
                </div>
            </div> : <Empty />}
            </div>
        );
    }
}


const formatCurrency = (amount) => `₵ ${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

//const totalAmt = (details) => details.reduce((a, c) => (a + (parseFloat(c.total_amount))), 0)

//const GrandTotal = (amount, discount) => amount - discount
