import React, { useEffect } from 'react';
import { Form, Button, Input } from "antd"
import { SaveOutlined,PhoneFilled } from "@ant-design/icons"
const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};

const { TextArea } = Input;
const Create = ({ onFinish, onFinishFailed, hideModalLoader }) => {
    useEffect(() => {
        setTimeout(() => {
            hideModalLoader()
        }, 1500); 
      
    }, [])

    return (
        <div>
            <Form name="Add" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Branch Name" name="branch_name"
                    rules={[{ required: true, message: 'Please Enter Branch Name', },]}
                >
                    <Input placeholder="Branch Name" allowClear />
                </Form.Item>
               <Form.Item label="Branch Type" name="branch_type"
                    rules={[{ required: true, message: 'Please Enter Branch Type', },]}
                >
                    <Input placeholder="Branch Type" allowClear />
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