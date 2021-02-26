import React, { Component } from 'react';

import { Modal } from 'antd';
export default class FormModal extends Component {
    footer = <div className="video-footer">
     {/*    <Button onClick={() => this.props.handleCancel}>Close</Button> */}
    </div>
   
    render() {
        const { children, title, visible, handleCancel, width } = this.props;
        return (
            <div>
                
                <Modal
                    title={title}
                    visible={visible}
                    maskClosable={false}
                    destroyOnClose
                    onCancel={handleCancel}
                    centered
                    width={width}
                    //  wrapClassName="ant-modal-centered"
                    footer={this.footer}
                    className="custom-modal-v1"
                    wrapClassName="ant-modal-centered"
                >
                    {children}
                </Modal>

            </div>
        );
    }
}
