import React from 'react';

import { Row, Col } from 'antd'


import SearchBox from "../Searchbox"
import ActionTools from "../ActionTools"

const PagesHeader = ({ addNewText,AddNewHandler, pageTitle, rightSide, placeholder, OnSearch }) => {
    return (
        <Row justify="space-between">
            <Col span={5}> <h1>{pageTitle}</h1></Col>
            <Col span={11}>
                <SearchBox placeholder={placeholder} OnSearch={OnSearch} />
            </Col>
            <Col span={8}>
                <ActionTools addNewText={addNewText} AddNewHandler={AddNewHandler} />
            </Col>
        </Row>
    );
};

export default PagesHeader;