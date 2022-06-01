import React from 'react';
import { Row, Col, Select } from "antd"
const { Option } = Select
const ProfileForm = ({ label, InputContent, InputSelectHandler }) => {
    return (
        <Row justify="space-around">
            <Col span={12}><strong>{label}</strong></Col>
            <Col span={12} className="gx-mb-10">
                <Select showSearch placeholder={label} optionFilterProp="children"
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    style={{ width: '100%' }} onChange={InputSelectHandler}>
                    {InputContent && InputContent.map((item, index) => (
                        <React.Fragment key={index}>
                            <Option key={item.id} value={item.id}>{item.indicator_description_m.description}</Option>
                        </React.Fragment>))}
                </Select>
            </Col>
        </Row>
    );
};

export default ProfileForm;