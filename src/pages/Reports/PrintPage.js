import React, { Component } from 'react';
import { Empty, } from 'antd';
import ReportHeader from "components/PdfReports/ReportHeader"
import _ from 'lodash';
//import moment from 'moment';
//const { Text } = Typography;
import "./style.scss"
export default class DailyReportPrint extends Component {



    render() {
        const { details, reportTitle } = this.props

        return (

            <div> {!_.isEmpty(details) ? <div id="invoice">

                <div className="  overflow-auto">
                    <div style={{ minWidth: "600px" }}>
                        <ReportHeader reportTitle={reportTitle} />
                        <div class="container-table100">
                            <div class="wrap-table100">
                                <div class="table100">
                                    <table data-vertable="ver1" className="table">
                                        <thead>
                                            <tr class="table100-head">
                                                <th className="column5">Customer No.</th>
                                                <th className="column1">Customer Name</th>
                                                <th className="column3 ">Account No.</th>
                                                <th className="column5 ">Branch</th>
                                                <th className="column6 gx-text-center">Risk Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                details && details.map(({ customer_no, customer_m, risk_value }, index) => {
                                                    return (<React.Fragment key={index}>
                                                        <tr key={index} className="row100">
                                                            <td className="column5">{customer_no}</td>
                                                            <td className="column1 ">{customer_m.customer}</td>
                                                            <td className="column3  ">{customer_m.account_no}</td>
                                                            <td className="column5  ">{customer_m.branch_m.branch_name}</td>
                                                            <td className="column6   gx-text-center">{risk_value}</td>
                                                        </tr>
                                                    </React.Fragment>
                                                    )
                                                })
                                            }
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <Empty />}
            </div>
        );
    }
}


