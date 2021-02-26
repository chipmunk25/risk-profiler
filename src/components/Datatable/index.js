import React from 'react';
import { Table, } from "antd"
import "./style.scss"
const Datatable = (props) => {
    return (
        <div className="table-container">
            <Table
                className="table table-striped-rows"
                scroll={{ x: 1500, y: 600 }}
                {...props}
                size="small"
            />
        </div>
    );
};

export default Datatable;