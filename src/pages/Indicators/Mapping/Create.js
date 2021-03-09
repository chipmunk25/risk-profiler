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
const Create = ({ onFinish, onFinishFailed, hideModalLoader, descriptionLists, indicatorLists }) => {


    useEffect(() => {
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [])

    return (
        <div>
            <Form name="Add" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>

                <Form.Item label="Indicator" name="indicator_id"
                    rules={[{ required: true, message: 'Please Select Indicator', },]}
                >
                    <Select showSearch placeholder="Select Indicator" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {indicatorLists && indicatorLists.map((item, index) => (
                            <React.Fragment key={index}>
                                <Option key={item.id} value={item.id}>{item.indicator}</Option>
                            </React.Fragment>))}
                    </Select>
                </Form.Item>

                <Form.Item label="Description" name="description_id"
                    rules={[{ required: true, message: 'Please Select Description', },]}
                >
                    <Select showSearch placeholder="Select Description" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {descriptionLists && descriptionLists.map((item, index) => (
                            <React.Fragment key={index}>
                                <Option key={item.id} value={item.id}>{item.description}</Option>
                            </React.Fragment>))}
                    </Select>
                </Form.Item>

                <Form.Item label="Value" name="indicator_descvalue" >
                    <InputNumber style={{ width: '100%' }} placeholder="Value" />
                </Form.Item>

                <Form.Item {...tailLayout} style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                    <Button type="primary" htmlType="submit">
                        <SaveOutlined />  Save
                 </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Create;