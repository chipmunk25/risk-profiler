import React, { useEffect, useState } from 'react';
import { Form, Button, Input } from "antd"
import { SaveOutlined } from "@ant-design/icons"

import TransferComponent from "components/Transfer"
import { useSelector } from 'react-redux';
const tailLayout = {
    wrapperCol: {
        offset: 12,
        span: 12,
    },
};

const Create = ({ setPermissionsLists, onFinish, onFinishFailed, hideModalLoader }) => {
    useEffect(() => {
        setTimeout(() => {
            hideModalLoader()
        }, 1500);

    }, [])
    const { permissionLists } = useSelector(({ auth }) => auth);
    const [permissions, setPermissions] = useState([]);
    const onChange = (nextTargetKeys) => {
        setPermissions(nextTargetKeys);
        setPermissionsLists(nextTargetKeys)
    };

    return (
        <div>
            <Form name="Add" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large"
                labelCol={{ span: 6, }} wrapperCol={{ span: 16, }}>
                <Form.Item label="Role Name" name="role_name"
                    rules={[{ required: true, message: 'Please Enter Role Name', },]}
                >
                    <Input placeholder="Role Name" allowClear />
                </Form.Item>

                <TransferComponent
                    titles={['Permissions', 'Role Permission']}
                    data={permissionLists && permissionLists.map(item => {
                        return {
                            ...item,
                            key: item.id
                        }
                    })}
                    targetKeys={permissions}
                    handleChange={onChange}
                />

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