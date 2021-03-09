import React, { useEffect } from 'react';
import { Form, Button, Input, Select, InputNumber } from "antd"
import { SaveOutlined, } from "@ant-design/icons"
const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};
const { TextArea } = Input
const { Option } = Select
const Create = ({ onFinish, onFinishFailed, hideModalLoader, statusLists }) => {


    useEffect(() => {
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [])

    return (
        <div>
            <Form name="Add" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Status" name="status_id"
                    rules={[{ required: true, message: 'Please Select Status', },]}
                >
                    <Select showSearch placeholder="Select Status" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {statusLists && statusLists.map((item, index) => (
                            <React.Fragment key={index}>
                                <Option key={item.id} value={item.id}>{item.status_name}</Option>
                            </React.Fragment>))}
                    </Select>
                </Form.Item>
                <Form.Item label="Review Type" name="review_type"
                    rules={[{ required: true, message: 'Please Enter Review Type', },]}
                >
                    <Input placeholder="Review Type" allowClear />
                </Form.Item>
                <Form.Item label="Value" name="review_value" >
                    <InputNumber style={{ width: '100%' }} placeholder="Value" />
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