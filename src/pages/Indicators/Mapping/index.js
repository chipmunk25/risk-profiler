import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Menu, Dropdown, Popconfirm } from "antd"
import { EditOutlined, MoreOutlined, DeleteOutlined } from "@ant-design/icons"

import PageContent from "components/PageContent"
import LoadingProgress from "components/Loading"
import FormModal from "components/Modals"

import Create from "./Create"
import Edit from "./Edit"

import { showAuthLoader, hideAuthLoader, showModal, hideModal } from "appRedux/Actions/common"
import {
    requestGetIndicatorMapping, requestSaveIndicatorMapping, requestUpdateIndicatorMapping,
    requestDeleteIndicatorMapping, requestGetIndicator,
    requestGetDescription,
} from "appRedux/Actions/indicator"

import FuzzySearch from 'fuzzy-search';
import FindName from "utils/FindName"

let searcher;
const IndicatorMapping = () => {
    const dispatch = useDispatch()
    const [modalType, setModalType] = useState(false)
    const [detail, setDetail] = useState({})
    const { indicatorLists, indicatorMappingLists, descriptionLists } = useSelector(({ indicators }) => indicators);
    const { modal, loader } = useSelector(({ common }) => common);
    const { authUser, user } = useSelector(({ auth }) => auth);

    useEffect(() => {
        dispatch(requestGetIndicatorMapping({
            del_flg: 0, company_id: user.company_id,
            branch_id: user.branch_id,
        }))
    }, [])

    useEffect(() => {
        dispatch(requestGetDescription({
            del_flg: 0, company_id: user.company_id,
            branch_id: user.branch_id,
        }))
    }, [])

    useEffect(() => {
        dispatch(requestGetIndicator({
            del_flg: 0, company_id: user.company_id,
            branch_id: user.branch_id,
        }))
    }, [])

    const LoadNShowModal = () => {
        dispatch(showAuthLoader())
        dispatch(showModal())
    }

    const CloseModal = () => dispatch(hideModal())
    const hideModalLoader = () => dispatch(hideAuthLoader())
    const EditDataHandler = record => {
        setModalType(true)
        setDetail(record)
        LoadNShowModal()
    }

    const DeleteHandler = record => {
        dispatch(showAuthLoader())
        dispatch(requestDeleteIndicatorMapping(record.id))
    }
    const AddNewHandler = () => {
        setModalType(false)
        LoadNShowModal()
    }
    const PrepareSave = record => {
        const data = record && record.descriptions.map(item => {
            return {
                ...item,
                company_id: user.company_id,
                branch_id: user.branch_id,
                created_user: authUser,
                indicator_id: record.indicator_id,
            }
        })
        return data
    }
    const SaveHandler = (record) => {
        /*  const data = {
             company_id: user.company_id,
             branch_id: user.branch_id,
             created_user: authUser,
             ...record
         } */
        const data = PrepareSave(record)
        dispatch(showAuthLoader())
        dispatch(requestSaveIndicatorMapping({ mapping: data }))
    }
    const UpdateHandler = (record) => {
        const data = {
            id: detail.id,
            ...record
        }
        dispatch(showAuthLoader())
        dispatch(requestUpdateIndicatorMapping(data))
    }

    const ValidationAlert = errorInfo => {
        // console.log(errorInfo)
    }

    const [dataSource, setDataSource] = useState([])
    searcher = new FuzzySearch(indicatorMappingLists, ["indicator_description_m.description", "indicator_m.indicator",], { caseSensitive: false });
    useEffect(() => {
        const LoadData = async () => {
            setDataSource(await indicatorMappingLists)
        }
        LoadData()
    }, [indicatorMappingLists])
    const OnSearch = (e) => setDataSource(searcher.search(e.target.value))
 //   console.log(dataSource)
    return (
        <div className="gx-main-content">
            <FormModal
                children={
                    <div>
                        <LoadingProgress loading={loader} />
                        {modalType ?
                            <Edit detail={detail} onFinish={UpdateHandler} hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert}
                                descriptionLists={descriptionLists}
                                indicatorLists={indicatorLists}
                            />
                            :
                            <Create onFinish={SaveHandler} hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert}
                                descriptionLists={descriptionLists}
                                indicatorLists={indicatorLists}
                            />
                        }
                    </div>
                }
                title={modalType ? "Edit" : "Create"}
                visible={modal}
                width={600}
                handleCancel={CloseModal}
            />


            <PageContent
                OnSearch={OnSearch}
                rowKey="id"
                dataSource={dataSource.map(item => {
                    return {
                        ...item,
                        indicator: item.indicator_m ? item.indicator_m.indicator : FindName(indicatorLists, item.indicator_id).indicator,
                        description: item.indicator_description_m ? item.indicator_description_m.description : FindName(descriptionLists, item.description_id).description,
                    }
                })}
                AddNewHandler={AddNewHandler}
                pageTitle="Indicator Mapping"
                placeholder="Search for Indicator Mapping"
                scroll={{ width: 700 }}
                loading={{ spinning: loader, indicator: <LoadingProgress loading={loader} /> }}
                addNewText="Indicator Mapping"
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                        width: 70,
                        fixed: 'left',
                    }, {
                        title: 'Indicator ',
                        dataIndex: 'indicator',
                        key: 'indicator',
                    }, {
                        title: 'Description',
                        dataIndex: 'description',
                        key: 'description',
                    }, {
                        title: 'Value ',
                        dataIndex: 'indicator_descvalue',
                        key: 'indicator_descvalue',
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        fixed: 'right',
                        width: 70,
                        render: (text, record) => (
                            <span >
                                <Dropdown
                                    //  disabled={sessionStorage.role === "ADMIN" ? false : true}
                                    overlay={
                                        (<Menu>
                                            <Menu.Item key="1">
                                                <span className="gx-text-blue" onClick={() => EditDataHandler(record)}>
                                                    <EditOutlined /> Edit
                                            </span>
                                            </Menu.Item>
                                            <Menu.Item key="2">
                                                <Popconfirm
                                                    placement="top"
                                                    title={`Are you sure to delete ${record.indicator}?`}
                                                    onConfirm={() => DeleteHandler(record)}
                                                    onCancel={(e) => console.log(e)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <span className="gx-text-red" >
                                                        <DeleteOutlined /> Delete
                                            </span>
                                                </Popconfirm>

                                            </Menu.Item>
                                        </Menu>)
                                    } placement="bottomRight" trigger={['click']}>
                                    <Button type="primary" className="gx-bg-geekblue"
                                        shape="circle"
                                        icon={<MoreOutlined style={{ fontWeight: 700 }} />}
                                        size="middle" />
                                </Dropdown>
                            </span>
                        ),
                    },
                ]}
            />

        </div>
    );
};

export default IndicatorMapping;