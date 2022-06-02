
import React, { Component } from 'react'
import "./report.scss"
export default class CustomerProfilerReport extends Component {
    render() {
        const { details, customerInfo, statusLists } = this.props

        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', }}>
                <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1>La Community Bank LTD</h1>
                </div>
                <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                        <span style={{ paddingLeft: '20px' }}><strong>Customer No:</strong> {customerInfo.customer_no}</span>
                        <span><strong>Customer Account:</strong> {customerInfo.account_no} </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <span style={{ paddingLeft: '20px' }}><strong>Customer Name:</strong> {customerInfo.customer} </span>
                        <span><strong>Telephone:</strong> {customerInfo.telephone} </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <span style={{ paddingLeft: '20px' }}><strong>Source of Funds:</strong>{customerInfo.sourceof_funds}</span>
                        <span><strong>Email:</strong>{customerInfo.email}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <span style={{ paddingLeft: '20px' }}><strong>Address:</strong>{customerInfo.address}</span>
                    </div>
                </div>
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h3>Customer Profiler Report</h3>
                </div>
                <div>
                    <div className="customer-profiler">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col" >Indicator</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.indicator_m.indicator}</td>
                                        <td>{item.indicator_description_m?.description}</td>
                                        <td>{item.description_value}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr class="text-offset">
                                    <td colspan="2">Total Risk</td>
                                    <td>{totalRisk(details)}</td>
                                </tr>

                                <tr>
                                    <td colspan="2">Average Indicator</td>
                                    <td>{averageRisk(totalRisk(details), details.length)}</td>
                                </tr>
                                <tr class="text-offset">
                                    <td><span style={{ paddingRight: 50, textAlign: 'left' }}>Risk Level: </span>{RatingCheck(statusLists, averageRisk(totalRisk(details), details.length))?.status_name}</td>
                                    <td colspan="2">{RatingCheck(statusLists, averageRisk(totalRisk(details), details.length))?.description}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', paddingTop: 80, paddingLeft: 20, paddingRight: 20 }}>

                        <div style={{ borderBottom: '1px solid black', width: 200, }}>

                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

const totalRisk = (details) => details.reduce((a, c) => (a + (parseFloat(c.description_value))), 0)
const averageRisk = (total, count) => (total / count)?.toFixed(2)
const RatingCheck = (arrayList, value) => arrayList.find(item => parseFloat(value) > parseFloat(item.rating_lower) && parseFloat(value) <= parseFloat(item.rating_upper))
