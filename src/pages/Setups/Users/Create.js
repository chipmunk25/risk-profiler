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
const Create = ({ onFinish, onFinishFailed, hideModalLoader, branchLists, roleLists, userStatusLists }) => {
    useEffect(() => {
        setTimeout(() => {
            hideModalLoader()
        }, 1500);

    }, [])

    return (
        <div>
            <Form name="Add" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Branch" name="branch_id"
                    rules={[{ required: true, message: 'Please Select Branch', },]}
                >
                    <Select key={2} showSearch placeholder="Select Branch" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {branchLists && branchLists.map((item, index) => (
                            <React.Fragment key={index}>
                                <Option key={item.id} value={item.id}>{item.branch_name}</Option>
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
                    <Select  showSearch  placeholder="Select Role" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {roleLists && roleLists.map((item, index) => (
                            <React.Fragment key={index}>
                                <Option key={item.id} value={item.id}>{item.role_name}</Option>
                            </React.Fragment>))}
                    </Select>
                </Form.Item>
                <Form.Item label="User Status" name="user_status"
                    rules={[{ required: true, message: 'Please Select User Status', },]}
                >
                    <Select  showSearch  placeholder="Select User Status" optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: '100%' }} >
                        {userStatusLists && userStatusLists.map((item, index) => (
                            <React.Fragment key={index}>
                                <Option key={item} value={item}>{item}</Option>
                            </React.Fragment>))}
                    </Select>
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