import React, { useEffect, useRef } from 'react';
import { Row, Col, Select, Button } from "antd"

import { useSelector, useDispatch } from 'react-redux';

import ReportPrint from "../PrintPage"
import ReactToPrint from 'react-to-print';

import { PrinterOutlined } from '@ant-design/icons';
import { showAuthLoader, hideAuthLoader, } from "appRedux/Actions/common"
import { requestGetBranch, } from "appRedux/Actions/auth"
import { requestGetProfilerSummary, } from "appRedux/Actions/indicator"
import Widget from "components/Widget";
const { Option } = Select
const RiskSummary = () => {

    const dispatch = useDispatch()
    const componentRef = useRef();
    const { user, branchLists } = useSelector(({ auth }) => auth);

    const { profilerSummaryLists } = useSelector(({ indicators }) => indicators);
    useEffect(() => {
        dispatch(requestGetBranch({ del_flg: 0, company_id: user.company_id, }))
    }, [])

    const GetDataHandler = () => {
        dispatch(showAuthLoader())
        dispatch(requestGetProfilerSummary(
            {
                del_flg: 0, company_id: user.company_id,
            }
        ))
    }
  
    return (
        <div>
            <Row>
                <Col span={24}>
                    <Widget styleName="gx-card-full">
                        <div className="gx-m-2 " style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h1 className={`gx-fs-xl gx-font-weight-bold gx-text-geekblue`}>Summary</h1>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <Select showSearch placeholder="Select Branch" optionFilterProp="children" allowClear
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    style={{ width: 300 }} >
                                    {branchLists && branchLists.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <Option key={item.id} value={item.id}>{item.branch_name}</Option>
                                        </React.Fragment>))}
                                </Select>

                                <div className="gx-ml-3">
                                    <Button type="primary" className="gx-btn-geekblue" onClick={GetDataHandler}>
                                        GetData
                                </Button>
                                </div>

                                <ReactToPrint
                                    trigger={() => <div className="text-right">
                                        <Button type="primary" id="printInvoice" className="btn btn-info"
                                            disabled={profilerSummaryLists.length === 0}><PrinterOutlined /> Print</Button>
                                    </div>}
                                    content={() => componentRef.current}
                                />
                            </div>
                        </div>
                    </Widget>
                </Col>
                <Col span={24}>
                    <ReportPrint reportTitle="Risk Profiler Summary" details={profilerSummaryLists} ref={componentRef} />
                </Col>
            </Row>
        </div>
    );
};

export default RiskSummary;