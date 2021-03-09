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
import { requestSaveReview, requestUpdateReview, requestDeleteReview, requestGetReview } from "appRedux/Actions/indicator"

import { requestGetStatus } from "appRedux/Actions/status"

import FuzzySearch from 'fuzzy-search';
const FindName = (arrayLists, value) => arrayLists.find(item => parseInt(item.id) === parseInt(value))

let searcher;
const Review = () => {
    const dispatch = useDispatch()
    const [modalType, setModalType] = useState(false)
    const [detail, setDetail] = useState({})
    const { reviewLists, } = useSelector(({ indicators }) => indicators);
    const { statusLists } = useSelector(({ statuses }) => statuses);
    const { modal, loader } = useSelector(({ common }) => common);
    const { authUser, user } = useSelector(({ auth }) => auth);

    useEffect(() => {
        dispatch(requestGetStatus({
            del_flg: 0, company_id: user.company_id,
            branch_id: user.branch_id,
        }))
    }, [])
    useEffect(() => {
        dispatch(requestGetReview({
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
        dispatch(requestDeleteReview(record.id))
    }
    const AddNewHandler = () => {
        setModalType(false)
        LoadNShowModal()
    }
    const SaveHandler = (record) => {
        const data = {
            company_id: user.company_id,
            branch_id: user.branch_id,
            created_user: authUser,
            ...record
        }
        dispatch(showAuthLoader())
        dispatch(requestSaveReview(data))
    }
    const UpdateHandler = (record) => {
        const data = {
            id: detail.id,
            ...record
        }
        dispatch(showAuthLoader())
        dispatch(requestUpdateReview(data))
    }

    const ValidationAlert = errorInfo => {
        // console.log(errorInfo)
    }

    const [dataSource, setDataSource] = useState([])
    searcher = new FuzzySearch(reviewLists, ["review_type", "status_m.status_name"], { caseSensitive: false });
    useEffect(() => {
        const LoadData = async () => {
            setDataSource(await reviewLists)
        }
        LoadData()
    }, [reviewLists])
    const OnSearch = (e) => setDataSource(searcher.search(e.target.value))

    return (
        <div className="gx-main-content">
            <FormModal
                children={
                    <div>
                        <LoadingProgress loading={loader} />
                        {modalType ?
                            <Edit detail={detail} onFinish={UpdateHandler} hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert}
                                statusLists={statusLists}
                            />
                            :
                            <Create onFinish={SaveHandler} hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert}
                                statusLists={statusLists}
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
                        ...item, status: item.status_m ? item.status_m.status_name : FindName(statusLists, item.status_id).status_name,
                    }
                })}
                AddNewHandler={AddNewHandler}
                pageTitle="Review"
                placeholder="Search for Review"
                scroll={{ width: 700 }}
                loading={{ spinning: loader, indicator: <LoadingProgress loading={loader} /> }}
                addNewText="Review"
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                        width: 70,
                        fixed: 'left',
                    }, {
                        title: 'Review Type ',
                        dataIndex: 'review_type',
                        key: 'review_type',
                    }, {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                    }, {
                        title: 'Value ',
                        dataIndex: 'review_value',
                        key: 'review_value',
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
                                                    title={`Are you sure to delete ${record.review_type}?`}
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

export default Review;