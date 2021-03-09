import React, { useEffect } from 'react';
import { Form, Button, Input } from "antd"
import { SaveOutlined } from "@ant-design/icons"
const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};
const Edit = ({ detail, onFinish, onFinishFailed, hideModalLoader }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            role_name: detail.role_name,
        });
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [detail])

    return (
        <div>
            <Form name="Edit" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Role Name" name="role_name"
                    rules={[{ required: true, message: 'Please Enter Role Name', },]}
                >
                    <Input placeholder="Role Name" allowClear />
                </Form.Item>
                <Form.Item {...tailLayout} style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                    <Button type="primary" htmlType="submit">
                        <SaveOutlined />  Update
                 </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Edit;