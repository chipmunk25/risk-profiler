import React, { useEffect } from 'react';
import { Form, Button, Input } from "antd"
import { SaveOutlined, } from "@ant-design/icons"
const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};


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
                
                <Form.Item label="Indicator Type" name="indicator_type"
                    rules={[{ required: true, message: 'Please Enter Indicator Type', },]}
                >
                    <Input placeholder="Indicator Type" allowClear />
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