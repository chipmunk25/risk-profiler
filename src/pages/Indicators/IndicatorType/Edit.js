import React, { useEffect } from 'react';
import { Form, Button, Input,  } from "antd"
import { SaveOutlined,  } from "@ant-design/icons"
const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};

const Edit = ({ detail, onFinish, onFinishFailed, hideModalLoader, }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            indicator_type: detail.indicator_type,
        });
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [detail])

    return (
        <div>
            <Form name="Edit" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                
                <Form.Item label="Indicator Type" name="indicator_type"
                    rules={[{ required: true, message: 'Please Enter Indicator Type', },]}
                >
                    <Input placeholder="Indicator Type" allowClear />
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