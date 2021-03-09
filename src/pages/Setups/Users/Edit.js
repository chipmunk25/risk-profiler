import React, { useEffect } from 'react';
import { Form, Button, Input, Select } from "antd"
import { SaveOutlined } from "@ant-design/icons"
const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};

const { Option } = Select
const Edit = ({ detail, onFinish, onFinishFailed, hideModalLoader, branchLists, roleLists, userStatusLists }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            fullname: detail.fullname,
            telephone: detail.telephone,
            email: detail.email,
            role_id: detail.role_id,
            branch_id: detail.branch_id,
            user_status: detail.user_status,
        });
        setTimeout(() => {
            hideModalLoader()
        }, 1500);
    }, [detail,])

    return (
        <div>
            <Form name="Edit" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Branch" name="branch_id"
                    rules={[{ required: true, message: 'Please Select Branch', },]}
                >
                    <Select key={2} showSearch placeholder="Select Branch" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {branchLists && branchLists.map((item, index) => (
                            <React.Fragment key={index}>
                                {detail.branch_id === item.id ?
                                    <Option selected value={detail.branch_id} >{item.branch_name}</Option>
                                    : <Option value={item.id}>{item.branch_name}</Option>}
                            </React.Fragment>))}
                    </Select>
                </Form.Item>
                <Form.Item label="Fullname" name="fullname" hasFeedback rules={[{ required: true, message: 'Please Enter Fullname', },]}  >
                    <Input placeholder="Fullname" />
                </Form.Item>
                <Form.Item label="Email" name="email" hasFeedback rules={[{ required: true, message: 'Please Enter Email', },]} >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item label="Telephone" name="telephone" hasFeedback rules={[{ required: true, message: 'Please Enter Telephone', },]} >
                    <Input placeholder="Telephone" />
                </Form.Item>
                <Form.Item label="Role" name="role_id"
                    rules={[{ required: true, message: 'Please Select Role', },]}
                >
                    <Select showSearch placeholder="Select Role" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {roleLists && roleLists.map((item, index) => (
                            <React.Fragment key={index}>
                                {detail.role_id === item.id ?
                                    <Option selected value={detail.role_id} >{item.role_name}</Option>
                                    : <Option value={item.id}>{item.role_name}</Option>}
                            </React.Fragment>))}
                    </Select>
                </Form.Item>
                <Form.Item label="User Status" name="user_status"
                    rules={[{ required: true, message: 'Please Select User Status', },]}
                >
                    <Select showSearch placeholder="Select User Status" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {userStatusLists && userStatusLists.map((item, index) => (
                            <React.Fragment key={index}>
                                <Option value={item}>{item}</Option>
                            </React.Fragment>))}
                    </Select>
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