import React from 'react';
import { Row, Col, Form, Input, Button } from 'antd'
import Widget from 'components/Widget';

import { useDispatch ,useSelector} from "react-redux";

import { showAuthLoader } from "appRedux/Actions/common"

import { requestUpdatePassword } from "appRedux/Actions/auth"


const tailLayout = { wrapperCol: { offset: 8, span: 16, }, };
const ResetPassword = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { authUser } = useSelector(({ auth }) => auth);
    const onFinish = values => {
        dispatch(showAuthLoader());
        const data = { id: authUser, ...values }
        dispatch(requestUpdatePassword(data));
    }
    const onFinishFailed = values => {
        // console.log(values)
    }
    return (
        <div>
            <Row justify="center">
                <Col span={12}>
                    <Widget>
                        <h1>Change Password</h1>
                        <Form name="change password" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}
                            size="large" labelCol={{ span: 6, }} wrapperCol={{ span: 16, }} >
                            <Form.Item name="oldpassword" label="Old Password" rules={[{ required: true, message: 'Please input your password!', },]} hasFeedback >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item name="password" label="New Password" rules={[{ required: true, message: 'Please input your password!', },]} hasFeedback >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item name="confirmpassword" label="Confirm Password" dependencies={['password']} hasFeedback rules={[{ required: true, message: 'Please confirm your password!', },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) { return Promise.resolve(); }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),]} >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item {...tailLayout}> <Button type="primary" htmlType="submit">Update Password </Button></Form.Item>
                        </Form>
                    </Widget>
                </Col>
            </Row>
        </div>

    );
};

export default ResetPassword;