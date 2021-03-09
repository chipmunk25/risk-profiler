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
            permission: detail.permission,
            description: detail.description,
            perm_type: detail.perm_type,
            perm_icon: detail.perm_icon,
            perm_parent: detail.perm_parent,
        });
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [detail])

    return (
        <div>
            <Form name="Edit" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Permission" name="permission"
                    rules={[{ required: true, message: 'Please Enter Permission', },]}
                >
                    <Input placeholder="Permission" allowClear />
                </Form.Item>
                <Form.Item label="Description" name="description"
                    rules={[{ required: true, message: 'Please Enter Description', },]}
                >
                    <Input placeholder="Description" allowClear />
                </Form.Item>
                <Form.Item label="Type" name="perm_type"
                    rules={[{ required: true, message: 'Please Enter Type', },]}
                >
                    <Input placeholder="Type" allowClear />
                </Form.Item>
                <Form.Item label="Icon Name" name="perm_icon"   
                >
                    <Input placeholder="Icon Name" allowClear />
                </Form.Item>
              <Form.Item label="Parent" name="perm_parent"
                >
                    <Input placeholder="Parent" allowClear />
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