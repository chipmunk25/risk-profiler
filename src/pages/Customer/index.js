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

import FuzzySearch from 'fuzzy-search';
let searcher;
const Customers = () => {
    const dispatch = useDispatch()
    const [modalType, setModalType] = useState(false)
    const [detail, setDetail] = useState({})
    const { customerLists, customerTypeLists } = useSelector(({ people }) => people);
    const { modal, loader } = useSelector(({ common }) => common);
    const { authUser, user } = useSelector(({ auth }) => auth);

    useEffect(() => {
        dispatch(requestGetCustomer({
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
            glcode: 325210,
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
    searcher = new FuzzySearch(customerLists, ["customer", "telephone", "address", "email",], { caseSensitive: false });
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
                                customerTypeLists={customerTypeLists}
                            />
                            :
                            <Create onFinish={SaveHandler} hideModalLoader={hideModalLoader} onFinishFailed={ValidationAlert}
                                customerTypeLists={customerTypeLists}
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
                dataSource={dataSource}
                AddNewHandler={AddNewHandler}
                pageTitle="Customers"
                placeholder="Search for Customers"
                scroll={{ width: 700 }}
                loading={{ spinning: loader, indicator: <LoadingProgress loading={loader} /> }}
                addNewText="Customer"
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                        width: 70,
                        fixed: 'left',
                    },/*  {
                        title: 'Customer Type',
                        dataIndex: 'customer_type_id',
                        key: 'customer_type_id',
                    }, */ {
                        title: 'Customer',
                        dataIndex: 'customer',
                        key: 'customer',
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
                    }, {
                        title: 'Glcode',
                        dataIndex: 'glcode',
                        key: 'glcode',
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