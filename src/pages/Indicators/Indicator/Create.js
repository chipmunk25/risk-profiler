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
const Create = ({ onFinish, onFinishFailed, hideModalLoader, indicatorTypeLists }) => {


    useEffect(() => {
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [])

    return (
        <div>
            <Form name="Add" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Type" name="indicator_type_id"
                    rules={[{ required: true, message: 'Please Select Type', },]}
                >
                    <Select showSearch placeholder="Select Type" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {indicatorTypeLists && indicatorTypeLists.map((item, index) => (
                            <React.Fragment key={index}>
                                <Option key={item.id} value={item.id}>{item.indicator_type}</Option>
                            </React.Fragment>))}
                    </Select>
                </Form.Item>
                <Form.Item label="Sort Order" name="sort_order" >
                    <InputNumber style={{ width: '100%' }} placeholder="Sort Order" />
                </Form.Item>

                <Form.Item label="Indicator" name="indicator"
                    rules={[{ required: true, message: 'Please Enter Indicator', },]}
                >
                    <TextArea allowClear placeholder="Indicator" autoSize={{ minRows: 5, maxRows: 10 }} />
                </Form.Item>

                <Form.Item {...tailLayout} style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                    <Button type="primary" htmlType="submit">
                        <SaveOutlined />  Save
                 </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Create;