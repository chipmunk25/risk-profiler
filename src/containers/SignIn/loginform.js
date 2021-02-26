import React from 'react';
import { Form, Input, Button } from "antd"
import { useDispatch } from "react-redux";

import { showAuthLoader } from "appRedux/Actions/common"
import { signInUser } from "appRedux/Actions/auth"
const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
const LoginForm = () => {
    const dispatch = useDispatch();
    const onFinish = values => {
          dispatch(showAuthLoader());
          dispatch(signInUser(values));
    }
    const onFinishFailed = values => {
        // console.log(values)
    }
    return (
        <div className="cs-login-form">
            <Form
                name="signin_form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
            >
                <Form.Item name="email" label="Email" hasFeedback rules={[{ required: true, type: 'email', message: 'The input is not valid E-mail!', }]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item hasFeedback name="password" label="Password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                    <Input.Password type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary login-btn" className="gx-mb-0" htmlType="submit">
                        Sign In
                    </Button>

                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;