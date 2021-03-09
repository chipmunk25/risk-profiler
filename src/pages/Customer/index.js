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
import { requestSaveCustomer, requestUpdateCustomer, requestDeleteCustomer, requestGetCustomer } from "appRedux/Actions/people"

import { requestGetBranch, } from "appRedux/Actions/auth"
import FuzzySearch from 'fuzzy-search';
import FindName from "utils/FindName"
let searcher;
const Customers = () => {
    const dispatch = useDispatch()
    const [modalType, setModalType] = useState(false)
    const [detail, setDetail] = useState({})
    const { customerLists, } = useSelector(({ people }) => people);
    const { modal, loader } = useSelector(({ common }) => common);
    const { authUser, user, branchLists } = useSelector(({ auth }) => auth);

    useEffect(() => {
        dispatch(requestGetCustomer({
            del_flg: 0, company_id: user.company_id,
            branch_id: user.branch_id,
        }))
    }, [])
    useEffect(() => {
        dispatch(requestGetBranch({ del_flg: 0, company_id: user.company_id, }))
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
        dispatch(requestDeleteCustomer(record.id))
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
        dispatch(requestSaveCustomer(data))
    }
    const UpdateHandler = (record) => {
        const data = {
            id: detail.id,
            ...record
        }
        dispatch(showAuthLoader())
        dispatch(requestUpdateCustomer(data))
    }

    const ValidationAlert = errorInfo => {
        // console.log(errorInfo)
    }

    const [dataSource, setDataSource] = useState([])
    searcher = new FuzzySearch(customerLists, ["customer_no", "customer", "account_no",
        "branch_m.branch_name", "telephone", "address", "email",], { caseSensitive: false });
    useEffect(() => {
        const LoadData = async () => {
            setDataSource(await customerLists)
        }
        LoadData()
    }, [customerLists])
    const OnSearch = (e) => setDataSource(searcher.search(e.target.value))

    return (
        <div className="gx-main-content">
            <FormModal
                children={
                    <div>
                        <LoadingProgress loading={loader} />
                        {modalType ?
                            <Edit detail={detail} onFinish={UpdateHandler} hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert}
                                branchLists={branchLists}
                            />
                            :
                            <Create onFinish={SaveHandler} hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert}
                                branchLists={branchLists}
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
                rowKey="customer_no"
                dataSource={dataSource.map(item => {
                    return {
                        ...item,
                        branch: item.branch_m ? item.branch_m.branch_name :
                            FindName(branchLists, item.branch_id).branch_name,
                    }
                })}
                AddNewHandler={AddNewHandler}
                pageTitle="Customers"
                placeholder="Search for Customers"
                scroll={{ width: 700 }}
                loading={{ spinning: loader, indicator: <LoadingProgress loading={loader} /> }}
                addNewText="Customer"
                columns={[
                    {
                        title: 'Customer No',
                        dataIndex: 'customer_no',
                        key: 'id',
                        width: 150,
                        fixed: 'left',
                    }, {
                        title: 'Branch',
                        dataIndex: 'branch',
                        key: 'branch',
                    }, {
                        title: 'Customer',
                        dataIndex: 'customer',
                        key: 'customer',
                    }, {
                        title: 'Account No',
                        dataIndex: 'account_no',
                        key: 'account_no',
                    }, {
                        title: 'Telephone',
                        dataIndex: 'telephone',
                        key: 'telephone',
                    }, {
                        title: 'Address',
                        dataIndex: 'address',
                        key: 'address',
                    }, {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
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
                                                    title={`Are you sure to delete ${record.customer}?`}
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

export default Customers;