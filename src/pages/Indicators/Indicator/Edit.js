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
const Edit = ({ detail, onFinish, onFinishFailed, hideModalLoader, indicatorTypeLists }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            indicator_type_id: detail.indicator_type_id,
            indicator: detail.indicator,
            sort_order: detail.sort_order,
        });
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [detail])

    return (
        <div>
            <Form name="Edit" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Type" name="indicator_type_id"
                    rules={[{ required: true, message: 'Please Select Type', },]}
                >
                    <Select showSearch placeholder="Select Type" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {indicatorTypeLists && indicatorTypeLists.map((item, index) => (
                            <React.Fragment key={index}>
                                {detail.indicator_type_id === item.id ?
                                    <Option selected value={detail.indicator_type_id} >{item.indicator_type}</Option>
                                    : <Option key={item.id} value={item.id}>{item.indicator_type}</Option>}
                            </React.Fragment>))}
                    </Select>
                </Form.Item>
                <Form.Item label="Sort Order" name="sort_order" >
                    <InputNumber style={{ width: '100%' }} placeholder="Sort Order" />
                </Form.Item>

                <Form.Item label="Indicator " name="indicator"
                    rules={[{ required: true, message: 'Please Enter Indicator', },]}
                >
                    <TextArea allowClear placeholder="Indicator" autoSize={{ minRows: 5, maxRows: 10 }} />
                </Form.Item>

                <Form.Item {...tailLayout} style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
                    <Button type="primary" htmlType="submit">
                        <SaveOutlined />  Update
                 </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Edit;