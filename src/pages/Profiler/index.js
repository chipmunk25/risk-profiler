import React, { useEffect, useState } from 'react';
import { Select, Row, Col, Tag, Button, message } from 'antd';

import { useSelector, useDispatch } from 'react-redux';

import Widget from "components/Widget";
import { requestGetCustomer } from "appRedux/Actions/people"
import {
    requestGetIndicatorMapping, requestGetIndicatorType, requestSaveProfiler
} from "appRedux/Actions/indicator"
import { showAuthLoader, hideAuthLoader, } from "appRedux/Actions/common"

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
    const [selectedCustomer, setSelectedCustomer] = useState(undefined)
    const [selectedIndicator, setSelectedSetIndicator] = useState(undefined)
    const [selectedIndicatorType, setSelectedIndicatorType] = useState("")
    const [state, setState] = useState({
        profiler: []
    })

    const { loader } = useSelector(({ common }) => common);
    const { user, authUser } = useSelector(({ auth }) => auth);
    const { customerLists, } = useSelector(({ people }) => people);
    const { statusLists, } = useSelector(({ statuses }) => statuses);
    const { indicatorTypeLists } = useSelector(({ indicators }) => indicators);

    useEffect(() => {
        dispatch(requestGetCustomer({
            del_flg: 0, company_id: user.company_id,
            branch_id: user.branch_id,
        }))
    }, [])

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

    const PrepareSave = () => {
        return state.profiler.map(item => {
            return {
                indicator_id: item.indicator_id,
                description_id: item.description_id,
                indicator_description_map_id: item.indicator_description_map_id,
                description_value: item.indicator_descvalue,
                customer_no: selectedCustomer.customer_no,
                ACTION_TYPE: "VERIFIED",
                company_id: user.company_id,
                created_user: authUser,
            }
        })
    }
    const SaveCustomerProfilerHandler = () => {
        if (_.isEmpty(selectedCustomer)) {
            message.error('Select Customer');
            return;
        }
        if (_.isEmpty(state.profiler)) {
            message.error('Select Indications');
            return;
        }
        const data = PrepareSave()
        //  console.log(data)
        dispatch(showAuthLoader())
        dispatch(requestSaveProfiler({ profiler: data }))
        setSelectedCustomer(undefined)
        setSelectedIndicatorType("")
        setSelectedSetIndicator(undefined)
        const removed = onRemoveAll(state)
        setState(removed)
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
                            <Widget styleName="gx-card-full">
                                <div className="gx-m-2">
                                    <h1 className={`gx-fs-xl gx-font-weight-bold gx-text-geekblue`}>Profiler Type</h1>
                                    <Select showSearch placeholder="Select Profiler Type" optionFilterProp="children" allowClear
                                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        style={{ width: '100%' }} onChange={HandleProfileTypeSelect} >
                                        {indicatorTypeLists && indicatorTypeLists.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <Option key={item.id} value={item.id}>{item.indicator_type}</Option>
                                            </React.Fragment>))}
                                    </Select>
                                </div>

                            </Widget>
                        </Col>
                        <Col span={24}>
                            <div >
                                {
                                    statusLists && _.sortBy(statusLists, "rating_lower").map((item, index) => (
                                        <div style={{display:'flex',justifyContent:'space-between'}}>
                                           <h1 className={`gx-fs-xl gx-font-weight-bold gx-text-geekblue`}> Above {item.rating_lower} to {item.rating_upper}:</h1>
                                        <Tag key={index} className={`gx-text-${item.textColor} gx-bg-${item.bgColor} gx-fs-2xl`}>{item.status_name}
                                       </Tag>
                                        </div>
                                    ))
                                }
                            </div>
                            <ProfileValueViewer
                                colorTitle={RatingCheck(statusLists, CalcProfValue(state.profiler)) ?
                                    RatingCheck(statusLists, CalcProfValue(state.profiler)).textColor : "geekblue"}
                                color={RatingCheck(statusLists, CalcProfValue(state.profiler)) ?
                                    RatingCheck(statusLists, CalcProfValue(state.profiler)).bgColor : "white"}
                                title={CalcProfValue(state.profiler)}
                            />
                        </Col>
                    </Row>

                </Col>
                <Col span={16}>

                    <Widget styleName="gx-card-full" title={
                        <h3 className=" h3 gx-text-capitalize gx-fs-l gx-font-weight-bold gx-text-geekblue">
                            {selectedIndicatorType} RISK PROFILING TEMPLATE
                             </h3>
                    } extra={
                        <Button type="primary" onClick={SaveCustomerProfilerHandler}>
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


        </div>
    );
};

const CalcProfValue = (profiler) => {
    return profiler.reduce((a, c) => (a + (parseFloat(c.indicator_descvalue))), 0)
}


const RatingCheck = (arrayList, value) => arrayList.find(item => parseInt(value) > parseInt(item.rating_lower) && parseInt(value) <= parseInt(item.rating_upper))


export default CustomerProfiler;