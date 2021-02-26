import React from 'react';
import {
    FileExcelFilled, FilePdfFilled,PlusOutlined
} from '@ant-design/icons';

import {  Tooltip } from 'antd'
import "./style.scss"
const ActionTools = ({ addNewText, ExportExcelHandler, ExportPDFHandler, AddNewHandler }) => {
   
    return (
        <div>
            <ul className="right-side-menu">

                <li>
                   
                    <Tooltip title={`Add New ${addNewText}`}>
                  {/*       <FileExcelFilled className="right-side-icons excel" onClick={ExportExcelHandler} /> */}
                        <PlusOutlined className="right-side-icons addnew" onClick={AddNewHandler} />
                    </Tooltip>
                </li>
                <li>
                    <Tooltip title="Export Excel">
                        <FileExcelFilled className="right-side-icons excel" onClick={ExportExcelHandler} />
                    </Tooltip>
                </li>

                <li>
                    <Tooltip title="Export PDF">
                        <FilePdfFilled className="right-side-icons pdf" onClick={ExportPDFHandler} />
                    </Tooltip>
                </li>
            </ul>
        </div>
    );
};

export default ActionTools;