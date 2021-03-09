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
    requestGetUsers, requestGetBranch, requestGetRole,
    requestSaveUser, requestUpdateUsers, requestDeleteUser
} from "appRedux/Actions/auth"

import FuzzySearch from 'fuzzy-search';
let searcher;
const FindName = (dataLists, value) => dataLists.find(item => parseInt(item.id) === parseInt(value))

const Branch = () => {
    const dispatch = useDispatch()
    const [modalType, setModalType] = useState(false)
    const [detail, setDetail] = useState({})
    const { modal, loader } = useSelector(({ common }) => common);
    const { authUser, user, userLists, branchLists, roleLists, userStatusLists } = useSelector(({ auth }) => auth);

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
        dispatch(requestGetUsers({ del_flg: 0, company_id: user.company_id, }))
    }, [])
    useEffect(() => {
        dispatch(requestGetBranch({ del_flg: 0, company_id: user.company_id, }))
    }, [])
    useEffect(() => {
        dispatch(requestGetRole({ del_flg: 0, company_id: user.company_id, }))
    }, [])

    const DeleteHandler = record => {
        dispatch(showAuthLoader())
        dispatch(requestDeleteUser(record.id))
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
            password: '123456',

        }
        dispatch(showAuthLoader())
        dispatch(requestSaveUser(data))
    }
    const UpdateHandler = (record) => {
        const data = {
            id: detail.id,
            ...record
        }
        dispatch(showAuthLoader())
        dispatch(requestUpdateUsers(data))
    }

    const ValidationAlert = errorInfo => {
        // console.log(errorInfo)
    }


    const [dataSource, setDataSource] = useState([])
    searcher = new FuzzySearch(userLists, ["fullname", "email", "telephone", "branch_m.branch_name", "role_m.role_name",], { caseSensitive: false });
    useEffect(() => {
        const LoadData = async () => {
            setDataSource(await userLists)
        }
        LoadData()
    }, [userLists])
    const OnSearch = (e) => setDataSource(searcher.search(e.target.value))

    return (
        <div className="gx-main-content">
            <FormModal
                children={
                    <div>
                        <LoadingProgress loading={loader} />
                        {modalType ?
                            <Edit detail={detail} onFinish={UpdateHandler}
                                branchLists={branchLists} roleLists={roleLists} userStatusLists={userStatusLists}
                                hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert} />
                            :
                            <Create onFinish={SaveHandler}
                                branchLists={branchLists} roleLists={roleLists} userStatusLists={userStatusLists}
                                hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert} />
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
                        role: item.role_m ? item.role_m.role_name : FindName(roleLists, item.role_id).role_name,
                        branch: item.branch_m ? item.branch_m.branch_name : FindName(branchLists, item.branch_id).branch_name,
                    }
                })}
                AddNewHandler={AddNewHandler}
                pageTitle="Users"
                placeholder="Search for User"
                addNewText="User"
                scroll={{ width: 500 }}
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                        width: 70,
                        fixed: 'left',
                    }, {
                        title: 'Fullname',
                        dataIndex: 'fullname',
                        key: 'fullname',
                    }, {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    }, {
                        title: 'Telephone',
                        dataIndex: 'telephone',
                        key: 'telephone',
                    }, {
                        title: 'Branch',
                        dataIndex: 'branch',
                        key: 'branch',
                    }, {
                        title: 'Role',
                        dataIndex: 'role',
                        key: 'role',
                    }, {
                        title: 'Status',
                        dataIndex: 'user_status',
                        key: 'user_status',
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
                                                    title={`Are you sure to delete ${record.supplier}?`}
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

export default Branch;