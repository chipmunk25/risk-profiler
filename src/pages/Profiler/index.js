import React, { useEffect, useState } from 'react';
import { Select, Form, Input, Row, Col, Tag, Button, message, Alert } from 'antd';

import { useSelector, useDispatch } from 'react-redux';

import { PhoneFilled } from "@ant-design/icons"
import Widget from "components/Widget";
import { requestGetCustomer } from "appRedux/Actions/people"
import {
    requestGetIndicatorMapping, requestGetIndicatorType, requestSaveProfiler
} from "appRedux/Actions/indicator"
import { showAuthLoader, hideAuthLoader, } from "appRedux/Actions/common"

import { requestGetBranch, } from "appRedux/Actions/auth"
import { requestGetStatus } from "appRedux/Actions/status"
import LoadingProgress from "components/Loading"
import { onAddItem, onItemExist, onUpdateItem, onRemoveAll } from "utils/CartFunctions"
import ProfileForm from "./ProfileForm"
import ProfileValueViewer from "./ValueViewer"
import _ from "lodash"
const { Option } = Select
const FindCustomer = (arrayList, value) => arrayList.find(item => item.customer_no === value)
const FindIndicator = (arrayList, value) => arrayList.find(item => parseInt(item.id) === parseInt(value))
const CustomerProfiler = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [selectedCustomer, setSelectedCustomer] = useState(undefined)
    const [selectedIndicator, setSelectedSetIndicator] = useState(undefined)
    const [selectedIndicatorType, setSelectedIndicatorType] = useState("")
    const [state, setState] = useState({
        profiler: []
    })

    const { loader } = useSelector(({ common }) => common);
    const { user, authUser, branchLists } = useSelector(({ auth }) => auth);
    const { customerLists, } = useSelector(({ people }) => people);
    const { statusLists, } = useSelector(({ statuses }) => statuses);
    const { indicatorTypeLists } = useSelector(({ indicators }) => indicators);

    console.log(user)
    useEffect(() => {
        dispatch(requestGetCustomer({
            del_flg: 0, company_id: user.company_id,
            branch_id: user.branch_id,
        }))
    }, [])
    //   console.log(selectedIndicator)
    useEffect(() => {
        dispatch(requestGetIndicatorMapping({
            del_flg: 0, company_id: user.company_id,
            branch_id: user.branch_id,
        }))
    }, [])

    useEffect(() => {
        dispatch(requestGetIndicatorType({
            del_flg: 0, company_id: user.company_id,
            branch_id: user.branch_id,
        }))
    }, [])
    useEffect(() => {
        dispatch(requestGetBranch({ del_flg: 0, company_id: user.company_id, }))
    }, [])

    useEffect(() => {
        dispatch(requestGetStatus({ del_flg: 0, company_id: user.company_id }))
    }, [])


    const HandleCustomerSelect = value => {
        const customer = FindCustomer(customerLists, value)
        setSelectedCustomer(customer)
    }

    const HandleProfileTypeSelect = value => {
        const indicator = FindIndicator(indicatorTypeLists, value)
        setSelectedIndicatorType(indicator ? indicator.indicator_type : "")
        setSelectedSetIndicator(indicator ? indicator.indicator_ms : [])
    }

    const InputSelectHandler = (value) => {
        const indicator = _.find(selectedIndicator, { indicator_desc_mapping_ms: [{ id: value }] });
        const inddesc = indicator.indicator_desc_mapping_ms.find(item => parseInt(item.id) === value)

        const checkExists = onItemExist(state, inddesc)
        if (checkExists) {
            const updatedItem = onUpdateItem(state, inddesc)
            setState(updatedItem)
        } else {
            const addedItem = onAddItem(state, inddesc)
            setState(addedItem)
        }
    }

    const PrepareSave = (customer_no) => {
        return state.profiler.map(item => {
            return {
                indicator_id: item.indicator_id,
                description_id: item.description_id,
                indicator_description_map_id: item.indicator_description_map_id,
                description_value: item.indicator_descvalue,
                customer_no,
                ACTION_TYPE: "VERIFIED",
                company_id: user.company_id,
                created_user: authUser,
            }
        })
    }
    const SaveCustomerProfilerHandler = (record) => {
        /*   if (_.isEmpty(selectedCustomer)) {
              message.error('Select Customer');
              return;
          } */
        if (_.isEmpty(state.profiler)) {
            message.error('Select Indications');
            return;
        }
        const data = PrepareSave(record.customer_no)
        //  console.log(data)
        const custdata = {
            company_id: user.company_id,
            created_user: authUser,
            review_by: authUser,
            ...record
        }
        const finaldata = { profiler: data, customer: custdata, customer_no: record.customer_no }
        console.log(finaldata)
        // dispatch(showAuthLoader())
        // dispatch(requestSaveProfiler(finaldata))
        // setSelectedCustomer(undefined)
        // setSelectedIndicatorType("")
        // setSelectedSetIndicator(undefined)
        // const removed = onRemoveAll(state)
        // setState(removed)
        // form.resetFields()
    }
    const onFinishFailed = errorInfo => console.log(errorInfo)
    // console.log(selectedIndicator, "indicator")
    return (
        <div>
            <LoadingProgress loading={loader} />
            <Form name="Add" form={form} onFinish={SaveCustomerProfilerHandler} onFinishFailed={onFinishFailed} size="small"
                labelCol={{ span: 7, }} wrapperCol={{ span: 16, }}>
                <Row>
                    <Col span={8}>
                        <Row>
                            <Col span={24}>
                                <Widget styleName="gx-card-full">
                                    <div className="gx-m-2">
                                        <h1 className={`gx-fs-xl gx-font-weight-bold gx-text-geekblue`}>Customer</h1>
                                        <Form.Item label="Branch" name="branch_id"
                                            rules={[{ required: true, message: 'Please Select Branch', },]}
                                        >
                                            <Select showSearch placeholder="Select Branch" optionFilterProp="children"
                                                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                style={{ width: '100%' }} >
                                                {branchLists && branchLists.map((item, index) => (
                                                    <React.Fragment key={index}>
                                                        <Option key={item.id} value={item.id}>{item.branch_name}</Option>
                                                    </React.Fragment>))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label="Customer No" name="customer_no"
                                            rules={[{ required: true, message: 'Please Enter Customer No', },]}
                                        >
                                            <Input placeholder="Customer No" allowClear />
                                        </Form.Item>
                                        <Form.Item label="Customer" name="customer"
                                            rules={[{ required: true, message: 'Please Enter Customer', },]}
                                        >
                                            <Input placeholder="Customer" allowClear />
                                        </Form.Item>
                                        <Form.Item label="Account No" name="account_no"
                                            rules={[{ required: true, message: 'Please Enter Account No', },]}
                                        >
                                            <Input placeholder="Account No" allowClear />
                                        </Form.Item>
                                        <Form.Item label="Source of Funds" name="sourceof_funds" >
                                            <Input placeholder="Source of Funds" />
                                        </Form.Item>
                                        <Form.Item label="Telephone" name="telephone"
                                            rules={[{ required: true, message: 'Please Enter Telephone', },]}
                                        >
                                            <Input placeholder="Telephone" addonBefore="+233" suffix={<PhoneFilled />} />
                                        </Form.Item>
                                        <Form.Item label="Email" name="email" >
                                            <Input placeholder="Email" />
                                        </Form.Item>
                                        <Form.Item label="Address" name="address"   >
                                            <Input placeholder="Address" />
                                        </Form.Item>
                                    </div>
                                </Widget>
                            </Col>

                            <Col span={24} className="profiler-card">
                                <div >
                                    {
                                        statusLists && _.sortBy(statusLists, "rating_lower").map((item, index) => (
                                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <h1 className={`gx-fs-xl gx-font-weight-bold gx-text-geekblue`}> Above {item.rating_lower} to {item.rating_upper}:</h1>
                                                <Tag key={index} className={`gx-text-${item.textColor} gx-bg-${item.bgColor} gx-fs-2xl`}>{item.status_name}
                                                </Tag>
                                            </div>
                                        ))
                                    }
                                </div>
                                {
                                    user.rating_type === "AVERAGE" ?
                                        <div>
                                            <ProfileValueViewer
                                                colorTitle={RatingCheck(statusLists, AverageRating(CalcProfValue(state.profiler), selectedIndicator ? selectedIndicator.length : 0)) ?
                                                    RatingCheck(statusLists, AverageRating(CalcProfValue(state.profiler), selectedIndicator ? selectedIndicator.length : 0)).textColor : "geekblue"}
                                                color={RatingCheck(statusLists, AverageRating(CalcProfValue(state.profiler), selectedIndicator ? selectedIndicator.length : 0)) ?
                                                    RatingCheck(statusLists, AverageRating(CalcProfValue(state.profiler), selectedIndicator ? selectedIndicator.length : 0)).bgColor : "white"}
                                                title={AverageRating(CalcProfValue(state.profiler), selectedIndicator ? selectedIndicator.length : 0)}
                                            />
                                            <Alert message={RatingCheck(statusLists, AverageRating(CalcProfValue(state.profiler), selectedIndicator ? selectedIndicator.length : 0)) ?
                                                RatingCheck(statusLists, AverageRating(CalcProfValue(state.profiler), selectedIndicator ? selectedIndicator.length : 0)).description : "Next Action After Assessment"} type="info" showIcon />
                                        </div>
                                        :
                                        <div>
                                            <ProfileValueViewer
                                                colorTitle={RatingCheck(statusLists, CalcProfValue(state.profiler)) ?
                                                    RatingCheck(statusLists, CalcProfValue(state.profiler)).textColor : "geekblue"}
                                                color={RatingCheck(statusLists, CalcProfValue(state.profiler)) ?
                                                    RatingCheck(statusLists, CalcProfValue(state.profiler)).bgColor : "white"}
                                                title={CalcProfValue(state.profiler)}
                                            />
                                            <Alert message={RatingCheck(statusLists, CalcProfValue(state.profiler)) ?
                                                RatingCheck(statusLists, CalcProfValue(state.profiler)).description : "Next Action After Assessment"} type="info" showIcon />
                                        </div>

                                }
                            </Col>
                        </Row>
                    </Col>
                    <Col span={16}>
                        <Row>
                            <Col span={24}>
                                <Widget styleName="gx-card-full">
                                    <div className="gx-m-2">
                                        <h1 className={`gx-fs-xl gx-font-weight-bold gx-text-geekblue`}>Profiler Type</h1>
                                        <Select showSearch placeholder="Select Profiler Type" optionFilterProp="children" allowClear
                                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            style={{ width: '50%' }} onChange={HandleProfileTypeSelect} >
                                            {indicatorTypeLists && indicatorTypeLists.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <Option key={item.id} value={item.id}>{item.indicator_type}</Option>
                                                </React.Fragment>))}
                                        </Select>
                                    </div>

                                </Widget>
                            </Col>
                            <Col span={24}>

                                <Widget styleName="gx-card-full" title={
                                    <h3 className=" h3 gx-text-capitalize gx-fs-l gx-font-weight-bold gx-text-geekblue">
                                        {selectedIndicatorType} RISK PROFILING TEMPLATE
                                    </h3>
                                } extra={
                                    <Button type="primary" htmlType="submit">
                                        Save
                                    </Button>
                                }>
                                    <div className="gx-m-2">
                                        {selectedIndicator ?
                                            selectedIndicator && selectedIndicator.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <ProfileForm
                                                        label={item.indicator}
                                                        InputContent={item.indicator_desc_mapping_ms}
                                                        InputSelectHandler={InputSelectHandler}
                                                    />
                                                </React.Fragment>
                                            ))
                                            : null}
                                    </div>
                                </Widget>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>

        </div>
    );
};

const CalcProfValue = (profiler) => {
    return profiler.reduce((a, c) => (a + (parseFloat(c.indicator_descvalue))), 0)
}


const RatingCheck = (arrayList, value) => arrayList.find(item => parseFloat(value) > parseFloat(item.rating_lower) && parseFloat(value) <= parseFloat(item.rating_upper))

const AverageRating = (total, count) => count ? (total / count).toFixed(2) : 0

export default CustomerProfiler;