import React, { useEffect } from 'react';
import { Form, Button, Input, Select, InputNumber, Col, Row, Space } from "antd"
import { SaveOutlined, } from "@ant-design/icons"

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};
//const { TextArea } = Input
const { Option } = Select
const Create = ({ onFinish, onFinishFailed, hideModalLoader, descriptionLists, indicatorLists }) => {


    useEffect(() => {
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [])

    return (
        <div className="mapping-form">
            <Form name="Add" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>

                <Form.Item label="Indicator" name="indicator_id" className="indicator"
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
                <Form.List name="descriptions" className="description-list">
                    {(fields, { add, remove }) => (
                        <>
                            <Form.Item>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button type="dashed" onClick={() => add()}
                                        icon={<PlusOutlined />}>  Add More Descriptions</Button>
                                    <Button type="primary" htmlType="submit">
                                        <SaveOutlined />  Save </Button>
                                </div>
                            </Form.Item>
                            {fields.map(field => (
                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'description_id']}
                                        fieldKey={[field.fieldKey, 'description_id']}
                                        rules={[{ required: true, message: 'Missing Description' }]}
                                        style={{ width: '100%' }}
                                    >
                                        <Select showSearch placeholder="Select Select Description" optionFilterProp="children"
                                            style={{ width: '100%' }} filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {descriptionLists && descriptionLists.map((item) => (
                                                <Option key={item.id} value={item.id}>{item.description}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'indicator_descvalue']}
                                        fieldKey={[field.fieldKey, 'indicator_descvalue']}
                                        rules={[{ required: true, message: 'Missing Value' }]}
                                    >
                                        <InputNumber placeholder="Value" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                            ))}

                        </>
                    )}
                </Form.List>
                {/*   <Form.List name="descriptions">
                    {(fields, { add, remove }) => (
                        <>
                            <Form.Item >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button type="dashed" onClick={() => add()}
                                        icon={<PlusOutlined />}>  Add More Descriptions</Button>
                                    <Button type="primary" htmlType="submit">
                                        <SaveOutlined />  Save </Button>
                                </div>

                            </Form.Item>

                            {fields.map((field, index) => (
                                <div key={index} style={{
                                    width: '100%', display: 'flex',
                                    justifyContent: "start",
                                    alignItems: 'center'
                                }}>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'description_id']}
                                        fieldKey={[field.fieldKey, 'description_id']}
                                        rules={[{ required: true, message: 'Please Select Description', },]}
                                        style={{ width: '80%' }}
                                    >
                                        <Select showSearch placeholder="Select Description" optionFilterProp="children"
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {descriptionLists && descriptionLists.map((item) => (
                                                <Option key={item.id} value={item.id}>{item.description}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'indicator_descvalue']}
                                        fieldKey={[field.fieldKey, 'indicator_descvalue']}
                                        rules={[{ required: true, message: 'Missing Value' }]}
                                    >
                                        <InputNumber placeholder="Value" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </div>
                            ))}
                        </>
                    )}
                </Form.List> */}


            </Form>
        </div>
    );
};

export default Create;