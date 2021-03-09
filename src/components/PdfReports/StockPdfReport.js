import React, { Component } from 'react';
import "./style.scss"
import ReportHeader from "./ReportHeader"

export default class StockPdfReport extends Component {

    render() {
        const { details, reportTitle } = this.props
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
                                        <th className="column100 column1">Category</th>
                                        <th className="column100 column1">Product</th>
                                        <th className="column100 column1">Unit</th>
                                        <th className="column20 column1">Quantity</th>
                                        <th className="column20 column1">Reorder Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {details ? details.length > 0 && details.map(({ product, unit, category, quantity,
                                        reorder_level, }, index) =>
                                    (
                                        <React.Fragment key={index}>
                                            <tr className="row100">
                                                <td className="column10 column1">{index + 1}</td>
                                                <td className="column100 column1">{category}</td>
                                                <td className="column100 column1">{product}</td>
                                                <td className="column100 column1">{unit}</td>
                                                <td className="column20 column1">{quantity}</td>
                                                <td className="column20 column1">{reorder_level}</td>
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
