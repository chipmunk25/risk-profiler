import React, { useEffect } from 'react';
import { Form, Button, Input, InputNumber } from "antd"
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
            status_name: detail.status_name,
            rating_lower: detail.rating_lower,
            rating_upper: detail.rating_upper,
            bgColor: detail.bgColor,
            textColor: detail.textColor,
        });
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [detail])

    return (
        <div>
            <Form name="Edit" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Status" name="status_name"
                    rules={[{ required: true, message: 'Please Enter Status', },]}
                >
                    <Input placeholder="Status" allowClear />
                </Form.Item>
                <Form.Item label="Rating Lower" name="rating_lower"
                    rules={[{ required: true, message: 'Please Enter Rating Lower', },]}
                >
                    <InputNumber style={{ width: '100%' }} placeholder="Rating Lower" allowClear />
                </Form.Item>
                <Form.Item label="Rating Upper" name="rating_upper"
                    rules={[{ required: true, message: 'Please Enter Rating Upper', },]}
                >
                    <InputNumber style={{ width: '100%' }} placeholder="Rating Upper" allowClear />
                </Form.Item>
                
                <Form.Item label="BG Color" name="bgColor"
                    rules={[{ required: true, message: 'Please Enter Background Color', },]}
                >
                    <Input placeholder="BG Color" allowClear />
                </Form.Item>

                <Form.Item label="Text Color" name="textColor"
                    rules={[{ required: true, message: 'Please Enter Text Color', },]}
                >
                    <Input placeholder="Text Color" allowClear />
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