import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Menu, Dropdown, Popconfirm } from "antd"
import { EditOutlined, MoreOutlined, DeleteOutlined ,ScissorOutlined} from "@ant-design/icons"

import PageContent from "components/PageContent"
import LoadingProgress from "components/Loading"
import FormModal from "components/Modals"

import Create from "./Create"
import Edit from "./Edit"
import Permission from "./Permission"

import { showAuthLoader, hideAuthLoader, showModal, hideModal } from "appRedux/Actions/common"
import { requestSaveRole, requestUpdateRole, requestDeleteRole, requestGetRole, requestGetPermission } from "appRedux/Actions/auth"

import FuzzySearch from 'fuzzy-search';
let searcher;
const Roles = () => {
    const dispatch = useDispatch()
    const [modalType, setModalType] = useState("")
    const [detail, setDetail] = useState({})
    const { modal, loader } = useSelector(({ common }) => common);
    const { user, authUser, roleLists } = useSelector(({ auth }) => auth);
    const [permissions, setPermissions] = useState([]);
    const LoadNShowModal = () => {
        dispatch(showAuthLoader())
        dispatch(showModal())
    }

    const CloseModal = () => dispatch(hideModal())
    const hideModalLoader = () => dispatch(hideAuthLoader())
    const PermissionDataHandler = record => {
       // console.log(record)
        setModalType("PERM")
        setDetail(record)
        LoadNShowModal()
    }
    const EditDataHandler = record => {
        setModalType("EDIT")
        setDetail(record)
        LoadNShowModal()
    }

    useEffect(() => {
        dispatch(requestGetRole({ company_id: user.company_id, del_flg: 0 }))
    }, [])
    useEffect(() => {
        dispatch(requestGetPermission({ del_flg: 0, company_id: user.company_id, }))
    }, [])

    const DeleteHandler = record => {
        dispatch(showAuthLoader())
        dispatch(requestDeleteRole(record.id))
    }
    const AddNewHandler = () => {
        setModalType("ADD")
        LoadNShowModal()
    }
    const SaveHandler = (record) => {
        const data = {
            company_id: user.company_id,
            created_user: authUser,
            permissions,
            ...record
        }
      //  console.log(data)
        dispatch(showAuthLoader())
        dispatch(requestSaveRole(data))
    }
    const UpdateHandler = (record) => {
        const data = {
            id: detail.id,
            updateRole:true,
             company_id: user.company_id,
            created_user: authUser,
            ...record
        }
        dispatch(showAuthLoader())
        dispatch(requestUpdateRole(data))
    }

 const UpdatePermissionsHandler = () => {
        const data = {
            id: detail.id,
            updatePerm:true,
            permissions,
             company_id: user.company_id,
            created_user: authUser,
            ...detail
        }
      //  console.log(data)
        dispatch(showAuthLoader())
        dispatch(requestUpdateRole(data))
    }

    const ValidationAlert = errorInfo => {
        // console.log(errorInfo)
    }


    const [dataSource, setDataSource] = useState([])
    searcher = new FuzzySearch(roleLists, ["role_name"], { caseSensitive: false });
    useEffect(() => {
        const LoadData = async () => {
            setDataSource(await roleLists)
        }
        LoadData()
    }, [roleLists])
    const OnSearch = (e) => setDataSource(searcher.search(e.target.value))

    return (
        <div className="gx-main-content">
            <FormModal
                children={
                    <div>
                        <LoadingProgress loading={loader} />
                        {modalType === "EDIT" ?
                            <Edit detail={detail} onFinish={UpdateHandler} hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert} />
                            :
                            modalType === "ADD" ?
                                <Create setPermissionsLists={setPermissions} onFinish={SaveHandler} hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert} />

                                : <Permission setPermissionsLists={setPermissions} detail={detail} UpdatePermissionsHandler={UpdatePermissionsHandler} hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert} />
                        }
                    </div>
                }
                title={modalType === "EDIT" ? "Edit" : modalType === "ADD" ? "Create" : `Permissions for ${detail.role_name}`}
                visible={modal}
                width={900}
                handleCancel={CloseModal}
            />

            <PageContent
                OnSearch={OnSearch}
                rowKey="id"
                dataSource={dataSource}
                AddNewHandler={AddNewHandler}
                pageTitle="Roles"
                placeholder="Search for Roles"
                addNewText="Role"
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
                        title: 'Role',
                        dataIndex: 'role_name',
                        key: 'role_name',
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
                                            <Menu.Item key="3">
                                                <span className="gx-text-blue" onClick={() => PermissionDataHandler(record)}>
                                                    <ScissorOutlined /> Permissions
                                            </span>
                                            </Menu.Item>
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

export default Roles;