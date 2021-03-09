import React, { useEffect } from 'react';
import { Form, Button, Input, Select, InputNumber } from "antd"
import { SaveOutlined, } from "@ant-design/icons"
const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};
const { Option } = Select
const Edit = ({ detail, onFinish, onFinishFailed, hideModalLoader, statusLists }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            status_id: detail.status_id,
            review_type: detail.review_type,
            review_value: detail.review_value,
        });
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [detail])

    return (
        <div>
            <Form name="Edit" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Status" name="status_id"
                    rules={[{ required: true, message: 'Please Select Status', },]}
                >
                    <Select showSearch placeholder="Select Status" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {statusLists && statusLists.map((item, index) => (
                            <React.Fragment key={index}>
                                {detail.status_id === item.id ?
                                    <Option selected value={detail.status_id} >{item.status_name}</Option>
                                    : <Option key={item.id} value={item.id}>{item.status_name}</Option>}
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
                        <SaveOutlined />  Update
                 </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Edit;