
import React from 'react';
import { Transfer, Card } from 'antd';

const TransferComponent = ({ data, titles, targetKeys, handleChange, }) => {
    return (
        <Card className="gx-card" title="Search">
            <Transfer
                titles={titles}
                dataSource={data}
                listStyle={{ width: 250, height: 300 }}
                targetKeys={targetKeys}
                onChange={handleChange}
                render={item => item.permission}
            />
        </Card>
    );
};

export default TransferComponent;
