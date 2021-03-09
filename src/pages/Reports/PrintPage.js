import React, { Component } from 'react';
import { Empty, } from 'antd';
import ReportHeader from "components/PdfReports/ReportHeader"
import _ from 'lodash';
//import moment from 'moment';
//const { Text } = Typography;

export default class DailyReportPrint extends Component {



    render() {
        const { details } = this.props

        return (

            <div> {!_.isEmpty(details) ? <div id="invoice">

                <div className="  overflow-auto">
                    <div style={{ minWidth: "600px" }}>
                        <ReportHeader />
                        <main className="table100 ver1 m-b-110">
                            <table data-vertable="ver1" className="table">
                                <thead>
                                    <tr className="row100 head">
                                        <th className="column100 column1">Customer No.</th>
                                        <th className="column100 column1">Customer Name</th>
                                        <th className="column100 column1 text-right">Account No.</th>
                                        <th className="column100 column1 text-right">Branch</th>
                                        <th className="column100 column1 text-right">Risk Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        details && details.map(({ customer_no, customer_m, risk_value }, index) => {
                                            return (<React.Fragment key={index}>
                                                <tr key={index} className="row100">
                                                    <td className="column200 column1 border-right ">{customer_no}</td>
                                                    <td className="column100 column1 border-right">{customer_m.customer}</td>
                                                    <td className="column20 column1 border-right text-right">{customer_m.account_no}</td>
                                                    <td className="column20 column1  border-right text-right">{customer_m.branch_m.branch_name}</td>
                                                    <td className="column20 column1  border-right text-right">{risk_value}</td>
                                                </tr>
                                            </React.Fragment>
                                            )
                                        })
                                    }
                                </tbody>
                                
                            </table>
                        </main>
                    </div>
                </div>
            </div> : <Empty />}
            </div>
        );
    }
}


