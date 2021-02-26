import React, { useEffect } from 'react';
import { Form, Button, Input, Select } from "antd"
import { SaveOutlined, PhoneFilled } from "@ant-design/icons"
const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};
const { TextArea } = Input;
const { Option } = Select;

const Edit = ({ detail, onFinish, onFinishFailed, hideModalLoader, customerTypeLists }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            customer_type_id: detail.customer_type_id,
            customer: detail.customer,
            telephone: detail.telephone,
            email: detail.email,
            address: detail.address,
        });
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [detail])

    return (
        <div>
            <Form name="Edit" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Customer Type" name="customer_type_id"
                    rules={[{ required: true, message: 'Please Select Customer Type', },]}
                >
                    <Select showSearch placeholder="Select Customer Type" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {customerTypeLists && customerTypeLists.map((item, index) => (
                            <React.Fragment key={index}>
                                {detail.customer_type_id === item.id ?
                                    <Option selected value={detail.id} >{item.customer_type}</Option>
                                    : <Option key={item.id} value={item.id}>{item.customer_type}</Option>}
                            </React.Fragment>))}

                    </Select>
                </Form.Item>
                <Form.Item label="Customer" name="customer"
                    rules={[{ required: true, message: 'Please Enter Customer', },]}
                >
                    <Input placeholder="Customer" allowClear />
                </Form.Item>
                <Form.Item label="Telephone" name="telephone"
                    rules={[{ required: true, message: 'Please Enter Telephone', },]}
                >
                    <Input placeholder="Telephone" addonBefore="+233" suffix={<PhoneFilled />} />
                </Form.Item>
                <Form.Item label="Email" name="email" >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item label="Address" name="address"   >
                    <TextArea allowClear placeholder="Address" autoSize={{ minRows: 2, maxRows: 6 }} />
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