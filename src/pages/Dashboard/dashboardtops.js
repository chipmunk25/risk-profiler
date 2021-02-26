import React from 'react';
import Widget from "components/Widget"
import { Table } from "antd"
import { Link } from "react-router-dom"
const DashboardTops = (props) => {
    return (
        <Widget styleName="gx-order-history"
            title={
                <h2 className="h4 gx-text-capitalize gx-mb-0">
                    {props.cartTitle}</h2>
            } extra={
                <p className="gx-text-warning gx-mb-0 gx-pointer" >
                    <Link to={props.viewAll}>
                        View All
                    </Link>
                </p>
            }>
            <div className="gx-table-responsive">
                <Table className="gx-table-no-bordered" {...props} pagination={false} bordered={false}
                    size="small"

                />
            </div>
        </Widget>
    );
};

export default DashboardTops;