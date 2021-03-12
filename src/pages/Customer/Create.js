import React, { useEffect } from 'react';
import { Form, Button, Input, Select } from "antd"
import { SaveOutlined, PhoneFilled } from "@ant-design/icons"
import { useSelector } from "react-redux"
const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};

const { TextArea } = Input;
const { Option } = Select;

const Create = ({ onFinish, onFinishFailed, hideModalLoader,branchLists }) => {

     useEffect(() => {
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [])

    return (
        <div>
            <Form name="Add" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Branch" name="branch_id"
                    rules={[{ required: true, message: 'Please Select Branch', },]}
                >
                    <Select  showSearch placeholder="Select Branch" optionFilterProp="children"
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
                    <TextArea allowClear placeholder="Address" autoSize={{ minRows: 2, maxRows: 6 }} />
                </Form.Item>
                <Form.Item {...tailLayout} style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                    <Button type="primary" htmlType="submit">
                        <SaveOutlined />  Save
                 </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Create;