import React, { Component } from 'react';
import "./style.scss"
import ReportHeader from "./ReportHeader"

export default class StockDetailsPdfReport extends Component {

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
                                        <th className="column100 column1">Stock Date</th>
                                        <th className="column100 column1">Stock Code</th>
                                        <th className="column100 column1">Total Cost</th>
                                        <th className="column20 column1">Supplier</th>
                                        <th className="column20 column1">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details ? details.length > 0 && details.map(({ rowNumber, stock_date, stock_code, stock_total_cost,
                                        supplier, detail }, index) =>
                                    (
                                        <React.Fragment key={index}>
                                            <tr className="row100">
                                                <td className="column10 column1">{rowNumber}</td>
                                                <td className="column20 column1">{stock_date}</td>
                                                <td className="column20 column1">{stock_code}</td>
                                                <td className="column20 column1">{stock_total_cost}</td>
                                                <td className="column100 column1">{supplier}</td>
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
