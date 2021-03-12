import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Select, Button, message, Input } from "antd"
import Widget from "components/Widget";
import { requestGetCustomer, requestUpdateCustomer } from "appRedux/Actions/people"
import LoadingProgress from "components/Loading"
import ProfileValueViewer from "./ValueViewer"
import _ from "lodash"
import { requestGetStatus } from "appRedux/Actions/status"
import { showAuthLoader, } from "appRedux/Actions/common"
import { requestGetProfilerSummary, } from "appRedux/Actions/indicator"
const FindCustomer = (arrayList, value) => arrayList.find(item => item.customer_no === value)
const { Option } = Select
const { TextArea } = Input

const CustomerRiskReview = () => {
    const dispatch = useDispatch()
    const [selectedCustomer, setSelectedCustomer] = useState(undefined)
    const [selectedCustomerRisk, setSelectedCustomerRisk] = useState(0)
    const [customerReviewComment, setCustomerReviewComment] = useState("")

    const { loader } = useSelector(({ common }) => common);
    const { customerLists, } = useSelector(({ people }) => people);
    const { profilerSummaryLists, } = useSelector(({ indicators }) => indicators);
    const { statusLists, } = useSelector(({ statuses }) => statuses);
    const { user, authUser } = useSelector(({ auth }) => auth);
    useEffect(() => {
        dispatch(requestGetCustomer({
            del_flg: 0, company_id: user.company_id,
            branch_id: user.branch_id,
        }))
        dispatch(requestGetProfilerSummary({
            del_flg: 0, company_id: user.company_id,
        }))
    }, [])
    useEffect(() => {
        dispatch(requestGetStatus({ del_flg: 0, company_id: user.company_id }))
    }, [])

    const UpdateCustomerHandler = () => {
        if (_.isEmpty(selectedCustomer)) {
            message.error('Select Customer');
            return;
        }
        if (_.isEmpty(customerReviewComment) || _.isNull(customerReviewComment) || customerReviewComment === "") {
            message.error('Enter some Comments');
            return;
        }
        const data = {
            ...selectedCustomer,
            review_comment: customerReviewComment,
            review_by: authUser,

        }
        dispatch(showAuthLoader())
        dispatch(requestUpdateCustomer(data))
        setCustomerReviewComment("")
        setSelectedCustomer(undefined)
    }

    const HandleCustomerSelect = value => {
        const customer = FindCustomer(customerLists, value)
        setSelectedCustomer(customer)
        const customerRisk = FindCustomer(profilerSummaryLists, value)
        setSelectedCustomerRisk(customerRisk ? customerRisk.risk_value : 0)
        setCustomerReviewComment(customer.review_comment)
    }
    return (
        <div>
            <LoadingProgress loading={loader} />
            <Row>
                <Col span={8}>
                    <Row>
                        <Col span={24}>
                            <Widget styleName="gx-card-full">
                                <div className="gx-m-2">
                                    <h1 className={`gx-fs-xl gx-font-weight-bold gx-text-geekblue`}>Customer Info</h1>
                                    <Select showSearch placeholder="Select Customer" optionFilterProp="children" allowClear
                                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        style={{ width: '100%' }} onChange={HandleCustomerSelect} >
                                        {customerLists && customerLists.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <Option key={item.customer_no} value={item.customer_no}>{item.customer}</Option>
                                            </React.Fragment>))}
                                    </Select>
                                </div>
                                <div className="gx-ml-2 gx-mt-3">
                                    <p>Customer Name: <strong>{selectedCustomer ? selectedCustomer.customer : ""}</strong></p>
                                    <p>Customer Number (CIF): <strong> {selectedCustomer ? selectedCustomer.customer_no : ""}</strong></p>
                                    <p>Account Number: <strong> {selectedCustomer ? selectedCustomer.account_no : ""}</strong></p>
                                    <p>Branch Name: <strong> {selectedCustomer ? selectedCustomer.branch_m.branch_name : ""}</strong></p>
                                </div>
                            </Widget>
                        </Col>
                        <Col span={24}>
                            <h1 className={`gx-fs-xl gx-font-weight-bold gx-text-geekblue`}>Risk Value</h1>
                            <ProfileValueViewer
                                colorTitle={RatingCheck(statusLists, selectedCustomerRisk) ?
                                    RatingCheck(statusLists, selectedCustomerRisk).textColor : "geekblue"}
                                color={RatingCheck(statusLists, selectedCustomerRisk) ?
                                    RatingCheck(statusLists, selectedCustomerRisk).bgColor : "white"}
                                title={selectedCustomerRisk}
                            />
                        </Col>
                        <Col span={24}>
                            <h1 className={`gx-fs-xl gx-font-weight-bold gx-text-geekblue`}>Previous Review Comment</h1>
                            <p>
                                {selectedCustomer ? selectedCustomer.review_comment : ""}</p>

                        </Col>

                    </Row>
                </Col>
                <Col span={16}>
                    <Row>
                        <Col span={24}>
                            <Widget styleName="gx-card-full" title={
                                <h3 className=" h3 gx-text-capitalize gx-fs-l gx-font-weight-bold gx-text-geekblue">
                                    Review Manager Comments </h3>
                            } extra={
                                <Button type="primary" onClick={UpdateCustomerHandler}>   Save</Button>
                            }>
                                <div className="gx-m-2" style={{ minHeight: 300 }}>
                                    <TextArea value={customerReviewComment} onChange={(e) => setCustomerReviewComment(e.target.value)} allowClear placeholder="Leave your Comments Here!!!" autoSize={{ minRows: 10, maxRows: 15 }} />
                                </div>
                            </Widget>
                        </Col>


                    </Row>


                </Col>
            </Row>
        </div>
    );
};
const RatingCheck = (arrayList, value) => arrayList.find(item => parseInt(value) > parseInt(item.rating_lower) && parseInt(value) <= parseInt(item.rating_upper))


export default CustomerRiskReview;