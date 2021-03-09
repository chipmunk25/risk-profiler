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
import { requestSavePermission, requestUpdatePermission, requestDeletePermission, requestGetPermission } from "appRedux/Actions/auth"

import FuzzySearch from 'fuzzy-search';
let searcher;
const Permissions = () => {
    const dispatch = useDispatch()
    const [modalType, setModalType] = useState(false)
    const [detail, setDetail] = useState({})
   
    const { modal, loader } = useSelector(({ common }) => common);
    const { user, authUser,permissionLists } = useSelector(({ auth }) => auth);

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

    useEffect(() => {
        dispatch(requestGetPermission({ del_flg: 0, company_id: user.company_id, }))
    }, [])

    const DeleteHandler = record => {
        dispatch(showAuthLoader())
        dispatch(requestDeletePermission(record.id))
    }
    const AddNewHandler = () => {
        setModalType(false)
        LoadNShowModal()
    }
    const SaveHandler = (record) => {
        const data = {
            ...record,
            company_id: user.company_id,
            created_user: authUser,
        }
        dispatch(showAuthLoader())
        dispatch(requestSavePermission(data))
    }
    const UpdateHandler = (record) => {
        const data = {
            id: detail.id,
            ...record
        }
        dispatch(showAuthLoader())
        dispatch(requestUpdatePermission(data))
    }

    const ValidationAlert = errorInfo => {
        // console.log(errorInfo)
    }

//console.log(permissionLists)
    const [dataSource, setDataSource] = useState([])
    searcher = new FuzzySearch(permissionLists, ["permission"], { caseSensitive: false });
    useEffect(() => {
        const LoadData = async () => {
            setDataSource(await permissionLists)
        }
        LoadData()
    }, [permissionLists])
    const OnSearch = (e) => setDataSource(searcher.search(e.target.value))

    return (
        <div className="gx-main-content">
            <FormModal
                children={
                    <div>
                        <LoadingProgress loading={loader} />
                        {modalType ?
                            <Edit detail={detail} onFinish={UpdateHandler} hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert} />
                            :
                            <Create onFinish={SaveHandler} hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert} />
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
                dataSource={dataSource}
                AddNewHandler={AddNewHandler}
                pageTitle="Permissions"
                placeholder="Search for Permissions"
                addNewText="Permission"
                loading={{ spinning: loader, indicator: <LoadingProgress loading={loader} /> }}
                scroll={{ width: 500 }}
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                        width: 70,
                        fixed: 'left',
                    }, {
                        title: 'Permission',
                        dataIndex: 'permission',
                        key: 'permission',
                    }, {
                        title: 'Description',
                        dataIndex: 'description',
                        key: 'description',
                    }, {
                        title: 'Type',
                        dataIndex: 'perm_type',
                        key: 'perm_type',
                    },{
                        title: 'Icon',
                        dataIndex: 'perm_icon',
                        key: 'perm_icon',
                    },{
                        title: 'Parent',
                        dataIndex: 'perm_parent',
                        key: 'perm_parent',
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        fixed: 'right',
                        width: 70,
                        render: (text, record) => (
                            <span >
                                <Dropdown
                                    //     disabled={sessionStorage.role === "ADMIN" ? false : true}
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
                                                    title={`Are you sure to delete ${record.name}?`}
                                                    onConfirm={() => DeleteHandler(record)}
                                                    onCancel={(e) => console.log(e)}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <span className="gx-text-red" >
                                                        <DeleteOutlined /> Delete
                                            </span>
                                                </Popconfirm></Menu.Item>
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

export default Permissions;