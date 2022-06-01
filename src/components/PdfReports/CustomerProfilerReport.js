
import React, { Component } from 'react'

export default class CustomerProfilerReport extends Component {
    render() {
        const { details, customerInfo, } = this.props

        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <span>Customer No: {customerInfo.customer_no}</span>
                    <span>Customer Account: {customerInfo.account_no} </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <span>Customer Name: {customerInfo.customer} </span>
                    <span>Telephone: {customerInfo.telephone} </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <span>Source of Funds:{customerInfo.sourceof_funds}</span>
                    <span>Email:{customerInfo.email}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <span>Address:{customerInfo.address}</span>

                </div>
                <div>
                    <div>
                        <table>
                            <tbody>
                                {details?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.indicator_m.indicator}</td>
                                        <td>{item.indicator_description_m?.description}</td>
                                        <td>{item.description_value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        )
    }
}
