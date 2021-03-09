import React, { Component } from 'react';
import "./style.scss"
import ReportHeader from "./ReportHeader"

export default class ProfomaDetailsPdfReport extends Component {

    render() {
        const { details ,reportTitle} = this.props
        return (
            <div id="invoice">
                <div style={{ minWidth: "600px" }}>
                    <div className="pdf-report">
                        <ReportHeader reportTitle={reportTitle} />
                        <main className="table100 ver1 m-b-110">
                            <table data-vertable="ver1" className="table">
                                <thead>
                                    <tr className="row100 head">
                                        <th className="column10 column1">#</th>
                                        <th className="column100 column1">Profoma Date</th>
                                        <th className="column100 column1">Profoma Code</th>
                                        <th className="column100 column1">Total Amount</th>
                                        <th className="column20 column1">Customer</th>
                                        <th className="column20 column1">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details ? details.length > 0 && details.map(({ rowNumber, order_date, order_code, total_amount,
                                        customer, detail }, index) =>
                                    (
                                        <React.Fragment key={index}>
                                            <tr className="row100">
                                                <td className="column10 column1">{rowNumber}</td>
                                                <td className="column20 column1">{order_date}</td>
                                                <td className="column20 column1">{order_code}</td>
                                                <td className="column20 column1">{total_amount}</td>
                                                <td className="column100 column1">{customer}</td>
                                                <td className="column200 column1">{detail}</td>
                                            </tr>
                                        </React.Fragment>
                                    )) : null}
                                </tbody>

                            </table>


                        </main>

                    </div>
                </div>
            </div>
        );
    }
}
