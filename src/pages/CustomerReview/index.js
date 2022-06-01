import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Select, Button, message } from "antd"
import Widget from "components/Widget";
import { requestGetCustomer } from "appRedux/Actions/people"
import LoadingProgress from "components/Loading"
import ProfileValueViewer from "./ValueViewer"
import _ from "lodash"
import { requestGetStatus } from "appRedux/Actions/status"
import { showAuthLoader, hideAuthLoader, } from "appRedux/Actions/common"
import { requestGetProfilerSummary, requestGetReview, requestGetCustomerReview, requestGetCustomerProfiler, requestSaveCustomerReview } from "appRedux/Actions/indicator"
const FindCustomer = (arrayList, value) => arrayList.find(item => item.customer_no === value)
const FindReviews = (arrayList, valueList) => arrayList.filter(item => valueList.includes(item.id));
const FindOldReviews = (myArray, myFilter) => myArray && myArray.filter((el) => myFilter.every((f) => parseInt(f.review_id) !== parseInt(el.id)));

/* const FindOldReviews = (myArray, myFilter) => myArray && myArray.filter((el) => {
    return myFilter.some((f) => {
        return parseInt(f.review_id) === parseInt(el.id)
    });
});

 */
const FindReview = (arrayList, value) => arrayList.filter(item => parseInt(item.status_id) === parseInt(value));
const { Option } = Select
const CustomerReview = () => {

    const dispatch = useDispatch()
    const [selectedCustomer, setSelectedCustomer] = useState(undefined)
    const [selectedReview, setSelectedReview] = useState([])
    const [selectedCustomerRisk, setSelectedCustomerRisk] = useState(undefined)
    const [reviewData, setReviewData] = useState(undefined)
    const { loader } = useSelector(({ common }) => common);
    const { customerLists, } = useSelector(({ people }) => people);
    const { profilerSummaryLists, reviewLists, customerReviewLists, customerProfiler } = useSelector(({ indicators }) => indicators);
    const { statusLists, } = useSelector(({ statuses }) => statuses);
    const { user, authUser } = useSelector(({ auth }) => auth);

    console.log(profilerSummaryLists, reviewLists, customerReviewLists, customerLists, customerProfiler)
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
    useEffect(() => {
        const oldrev = FindOldReviews(reviewData, customerReviewLists)
        setReviewData(oldrev)
    }, [customerReviewLists])


    useEffect(() => {
        dispatch(requestGetReview({
            del_flg: 0, company_id: user.company_id,
            branch_id: user.branch_id,
        }))
    }, [])

    const HandleCustomerSelect = value => {
        const customer = FindCustomer(customerLists, value)
        setSelectedCustomer(customer)
        const customerRisk = FindCustomer(profilerSummaryLists, value)
        setSelectedCustomerRisk(customerRisk?.risk_value)
        const reviewl = RatingCheck(statusLists, customerRisk?.risk_value)
        const revl = FindReview(reviewLists, reviewl?.id)
        setReviewData(revl)
        console.log(customer, customerRisk, reviewl, revl)
        dispatch(requestGetCustomerReview({ del_flg: 0, company_id: user.company_id, customer_no: value }))
        dispatch(requestGetCustomerProfiler({ del_flg: 0, company_id: user.company_id, customer_no: value }))
    }
    const HandleReviewSelect = (value) => {
        const selReview = FindReviews(reviewLists, value)
        setSelectedReview(selReview)
    }
    const PrepareSave = (customer_no) => {
        return selectedReview.map(item => {
            return {
                review_id: item.id,
                review_value: item.review_value,
                customer_no,
                company_id: user.company_id,
                created_user: authUser,
            }
        })
    }
    const SaveCustomerReviewHandler = () => {
        if (_.isEmpty(selectedCustomer)) {
            message.error('Select Customer');
            return;
        }
        if (_.isEmpty(selectedReview)) {
            message.error('Select Review');
            return;
        }
        const data = PrepareSave(selectedCustomer.customer_no)
        dispatch(showAuthLoader())
        dispatch(requestSaveCustomerReview({ review: data }))
        setSelectedCustomer(undefined)
        setSelectedReview([])
        setSelectedCustomerRisk(undefined)
        setReviewData(undefined)
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
                            {//customerProfiler
                                user.rating_type === "AVERAGE" ? <ProfileValueViewer
                                    colorTitle={RatingCheck(statusLists, selectedCustomerRisk) ?
                                        RatingCheck(statusLists, RatingAfterReview(AverageRating(selectedCustomerRisk, customerProfiler.length), CalcReviewValue(selectedReview))).textColor : "geekblue"}
                                    color={RatingCheck(statusLists, AverageRating(selectedCustomerRisk, customerProfiler.length)) ?
                                        RatingCheck(statusLists, RatingAfterReview(AverageRating(selectedCustomerRisk, customerProfiler.length), CalcReviewValue(selectedReview))).bgColor : "white"}
                                    title={RatingAfterReview(AverageRating(selectedCustomerRisk, customerProfiler.length), CalcReviewValue(selectedReview))}

                                /> : <ProfileValueViewer
                                    colorTitle={RatingCheck(statusLists, selectedCustomerRisk) ?
                                        RatingCheck(statusLists, RatingAfterReview(selectedCustomerRisk, CalcReviewValue(selectedReview))).textColor : "geekblue"}
                                    color={RatingCheck(statusLists, selectedCustomerRisk) ?
                                        RatingCheck(statusLists, RatingAfterReview(selectedCustomerRisk, CalcReviewValue(selectedReview))).bgColor : "white"}
                                    title={RatingAfterReview(selectedCustomerRisk, CalcReviewValue(selectedReview))}
                                />}

                        </Col>
                        <Col span={24}>
                            <h3 className=" h3 gx-text-capitalize gx-fs-l gx-font-weight-bold gx-text-geekblue">
                                Customer Already Review Details </h3>
                            {
                                customerReviewLists ?
                                    customerReviewLists.map(item => (
                                        <Widget key={item.review_id} styleName="gx-card-full">
                                            <div className="gx-m-2">
                                                <p> {item.review_m.review_type}: <strong>{item.review_value}</strong></p>
                                            </div>
                                        </Widget>
                                    ))
                                    : null
                            }
                        </Col>
                    </Row>
                </Col>
                <Col span={16}>
                    <Row>
                        <Col span={24}>
                            <Widget styleName="gx-card-full" title={
                                <h3 className=" h3 gx-text-capitalize gx-fs-l gx-font-weight-bold gx-text-geekblue">
                                    RISK PROFILING REVIEW FOR CUSTOMER </h3>
                            } extra={
                                <Button type="primary" onClick={SaveCustomerReviewHandler}>   Save</Button>
                            }>
                                <div className="gx-m-2">
                                    <h1 className={`gx-fs-xl gx-font-weight-bold gx-text-geekblue`}>Review List</h1>
                                    <Select showSearch placeholder="Select Review" mode="multiple"
                                        optionFilterProp="children" allowClear
                                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        style={{ width: '100%' }} onChange={HandleReviewSelect} >
                                        {reviewData && reviewData.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <Option key={item.id} value={item.id}>{item.review_type}</Option>
                                            </React.Fragment>))}
                                    </Select>
                                </div>
                            </Widget>
                        </Col>
                        <Col span={24}>
                            <h3 className=" h3 gx-text-capitalize gx-fs-l gx-font-weight-bold gx-text-geekblue">
                                Review Details </h3>
                            {
                                selectedReview ?
                                    selectedReview.map(item => (
                                        <Widget key={item.id} styleName="gx-card-full">
                                            <div className="gx-m-2">
                                                <p> {item.review_type}: <strong>{item.review_value}</strong></p>
                                            </div>
                                        </Widget>
                                    ))
                                    : null
                            }
                        </Col>

                    </Row>


                </Col>
            </Row>
        </div>
    );
};

const CalcReviewValue = (profiler) =>
    profiler.reduce((a, c) => (a + (parseFloat(c.review_value))), 0)

const RatingCheck = (arrayList, value) => arrayList.find(item => parseInt(value) > parseInt(item.rating_lower) && parseInt(value) <= parseInt(item.rating_upper))
const AverageRating = (total, count) => count ? (total / count).toFixed(2) : 0

const RatingAfterReview = (riskvalue, reviewvalue) => NotZero(riskvalue) - NotZero(reviewvalue)
const NotZero = value => value ? value : 0
export default CustomerReview;